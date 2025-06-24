import { CreateMovieDto } from '../dtos/create-movie.dto';
import { QueryMovieDto } from '../dtos/query-movie.dto';
import { MovieService } from '../services/movie.service';
import { Request, Response } from 'express';

export class MovieController {
  constructor(private readonly movieService: MovieService) {}
  async create(req: Request, res: Response) {
    try {
      const data = req.body as CreateMovieDto;

      const movie = await this.movieService.create(data);

      return res.status(201).json(movie);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: errorMessage });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const query: QueryMovieDto = {
        title: req.query.title?.toString(),
        stars: req.query.stars?.toString(),
        format: req.query.format?.toString(),
        year: req.query.year ? parseInt(req.query.year as string) : undefined,
        sort: ((): 'id' | 'title' | 'year' | undefined => {
          const allowedSorts = ['id', 'title', 'year'];
          const sortParam = req.query.sort?.toString();
          return allowedSorts.includes(sortParam as string)
            ? (sortParam as 'id' | 'title' | 'year')
            : 'id';
        })(),
        order: ((): 'ASC' | 'DESC' | undefined => {
          const orderParam = req.query.order?.toString().toUpperCase();
          return orderParam === 'ASC' || orderParam === 'DESC'
            ? (orderParam as 'ASC' | 'DESC')
            : 'ASC';
        })(),
        limit: req.query.limit ? parseInt(req.query.limit as string) : 20,
        offset: req.query.offset ? parseInt(req.query.offset as string) : 0,
      };

      const movies = await this.movieService.findAll(query);
      return res.status(200).json(movies);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: errorMessage });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }

      const movie = await this.movieService.findById(id);
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }

      return res.status(200).json(movie);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: errorMessage });
    }
  }

  async handleFileUpload(req: Request, res: Response) {
    try {
      const file = req.file;
      const result = await this.movieService.processFile(file!);
      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ message });
    }
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const data = req.body;
    const updatedMovie = await this.movieService.update(id, data);
    return res.status(200).json(updatedMovie);
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      await this.movieService.delete(id);
      return res.status(204).send();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      return res
        .status(500)
        .json({ message: 'Internal Server Error', error: errorMessage });
    }
  }
}
