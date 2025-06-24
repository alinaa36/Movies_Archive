import { CreationAttributes } from 'sequelize';
import { CreateMovieDto } from '../dtos/create-movie.dto';
import { Movie } from '../models/movie.models';
import { movieRepository } from '../repository/movie.repository';
import { QueryMovieDto } from '../dtos/query-movie.dto';

export class MovieService {
  constructor(private readonly MovieRepository: movieRepository) {}
  async create(data: CreateMovieDto): Promise<Movie> {
    const movieData: CreationAttributes<Movie> = data
    return await this.MovieRepository.createMovie(movieData);
  }

  async findAll(query: QueryMovieDto): Promise<Movie[]> {
    const result = await this.MovieRepository.findMovies(query);
    return result.rows;
  }

  async findById(id: number): Promise<Movie | null> {
    return await this.MovieRepository.findMovieById(id);
  }
}
