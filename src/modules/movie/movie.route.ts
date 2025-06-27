import { Router } from 'express';
import { MovieService } from './services/movie.service';
import { MovieController } from './controllers/movie.controllers';
import { movieRepository } from './repository/movie.repository';
import { memoryUpload } from '#middleware/import.middleware.js';
import { validateDto } from '#middleware/validateDto.middleware.js';
import { CreateMovieDto } from './dtos/create-movie.dto';
import asyncHandler from 'express-async-handler';
import { authMiddleware } from '#middleware/auth.middleware.js';
import { UpdateMovieDto } from './dtos/update-movie.dto';

const router = Router();
const MovieRepository = new movieRepository();
const movieService = new MovieService(MovieRepository);
const movieController = new MovieController(movieService);

router.post('/', authMiddleware, validateDto(CreateMovieDto), asyncHandler(async (req, res) => {
  await movieController.create(req, res);
}));

router.get('/', authMiddleware, asyncHandler(async (req, res) => {
  await movieController.findAll(req, res);
}));

router.post('/import', authMiddleware, memoryUpload.single('file'), asyncHandler(async (req, res) => {
  await movieController.handleFileUpload(req, res);
}));

router.get('/:id', authMiddleware, asyncHandler(async (req, res) => {
  await movieController.findById(req, res);
}));

router.delete('/:id', authMiddleware, asyncHandler(async (req, res) => {
  await movieController.delete(req, res);
}));

router.patch('/:id', authMiddleware, validateDto(UpdateMovieDto), asyncHandler(async (req, res) => {
  await movieController.update(req, res);
}));

export default router;
