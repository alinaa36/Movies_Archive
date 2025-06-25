import { Router } from 'express';
import { MovieService } from './services/movie.service';
import { MovieController } from './controllers/movie.controllers';
import { Movie } from './models/movie.models';
import { movieRepository } from './repository/movie.repository';
import { memoryUpload } from '#middleware/import.middleware.js';
import { validateDto } from '#middleware/validateDto.middleware.js';
import { CreateMovieDto } from './dtos/create-movie.dto';

const router = Router();
const MovieRepository = new movieRepository();
const movieService = new MovieService(MovieRepository);
const movieController = new MovieController(movieService);

router.post('/', validateDto(CreateMovieDto), async (req, res) => {
  await movieController.create(req, res);
});

router.get('/', async (req, res) => {
  await movieController.findAll(req, res);
});

router.post('/import', memoryUpload.single('file'), async (req, res) => {
    await movieController.handleFileUpload(req, res);
});

router.get('/:id', async (req, res) => {
  await movieController.findById(req, res); 
});

router.delete('/:id', async (req, res) => {
  await movieController.delete(req, res);
});

router.patch('/:id', async (req, res) => {
  await movieController.update(req, res);
});

export default router;
