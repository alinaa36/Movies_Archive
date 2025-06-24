import { CreationAttributes } from 'sequelize';
import { CreateMovieDto } from '../dtos/create-movie.dto';
import { Movie } from '../models/movie.models';
import { movieRepository } from '../repository/movie.repository';
import { QueryMovieDto } from '../dtos/query-movie.dto';
import { UpdateMovieDto } from '../dtos/update-movie.dto';

export class MovieService {
  constructor(private readonly MovieRepository: movieRepository) {}
  async create(data: CreateMovieDto): Promise<Movie> {
    const movieData: CreationAttributes<Movie> = data;
    return await this.MovieRepository.createMovie(movieData);
  }

  async findAll(query: QueryMovieDto): Promise<Movie[]> {
    const result = await this.MovieRepository.findMovies(query);
    return result.rows;
  }

  async findById(id: number): Promise<Movie | null> {
    return await this.MovieRepository.findMovieById(id);
  }

  async processFile(file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    const content = file.buffer.toString('utf-8');
    const movies = this.parseMovies(content);

    const results = [];
    for (const movie of movies) {
      const created = await this.create(movie);
      results.push(created);
    }

    return results;
  }

  async update(id: number, data: UpdateMovieDto): Promise<Movie> {
    const movie = await this.MovieRepository.findMovieById(id);
    if (!movie) {
      throw new Error(`Movie with id ${id} not found`);
    }
    return await movie?.update(data);
}

  async delete(id: number): Promise<void> {
    const movie = await this.MovieRepository.findMovieById(id);
    if (!movie) {
      throw new Error(`Movie with id ${id} not found`);
    }
    await this.MovieRepository.deleteMovie(id);
  }

  private parseMovies(text: string): CreateMovieDto[] {
    const normalized = text.replace(/\r\n/g, '\n');
    const blocks = normalized.split(/\n{2,}/);
    const result: CreateMovieDto[] = [];

    for (const block of blocks) {
      const lines = block.split('\n');
      const data: any = {};

      const fieldMap: Record<string, (value: string) => void> = {
        Title: (val) => (data.title = val),
        'Release Year': (val) => (data.year = parseInt(val)),
        Format: (val) => (data.format = val),
        Stars: (val) => (data.stars = val),
      };

      for (const line of lines) {
        const [keyPart, ...valueParts] = line.split(':');
        const key = keyPart.trim();
        const value = valueParts.join(':').trim();

        const setter = fieldMap[key];
        if (setter) {
          setter(value);
        }
      }

      if (data.title && data.year && data.format && data.stars) {
        result.push(data as CreateMovieDto);
      }
    }

    return result;
  }
}
