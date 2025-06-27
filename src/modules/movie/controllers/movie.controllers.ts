import { Request, Response } from 'express';
import { CreateMovieDto } from '../dtos/create-movie.dto';
import { QueryMovieDto } from '../dtos/query-movie.dto';
import { MovieService } from '../services/movie.service';
import { HttpException } from '#utils/http-exeption.js';

export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  async create(req: Request, res: Response) {
    const data = req.body as CreateMovieDto;
    const movie = await this.movieService.create(data);
    res.status(201).json(movie);
  }

  async findAll(req: Request, res: Response) {
    const query = req.query as QueryMovieDto;
    const movies = await this.movieService.findAll(query);
    res.status(200).json(movies);
  }

  async findById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new HttpException('Invalid ID format', 400);
    }

    const movie = await this.movieService.findById(id);
    if (!movie) {
      throw new HttpException('Movie not found', 404);
    }

    res.status(200).json(movie);
  }

  async handleFileUpload(req: Request, res: Response) {
    const file = req.file;
    if (!file) {
      throw new HttpException('File is required', 400);
    }

    const result = await this.movieService.processFile(file);
    res.status(200).json(result);
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new HttpException('Invalid ID format', 400);
    }

    const data = req.body;
    const updated = await this.movieService.update(id, data);
    res.status(200).json(updated);
  }

  async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new HttpException('Invalid ID format', 400);
    }

    await this.movieService.delete(id);
    res.status(204).send();
  }
}
