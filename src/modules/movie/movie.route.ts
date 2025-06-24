import { Router } from 'express';
import { MovieService } from './services/movie.service';
import { MovieController } from './controllers/movie.controllers';
import { Movie } from './models/movie.models';
import { movieRepository } from './repository/movie.repository';

const router = Router();
const MovieRepository = new movieRepository();
const movieService = new MovieService(MovieRepository);
const movieController = new MovieController(movieService);

router.post('/', async (req, res) => {
  await movieController.create(req, res);
});

router.get('/', async (req, res) => {
  await movieController.findAll(req, res);
});

router.get('/:id', async (req, res) => {
  await movieController.findById(req, res); 
});

export default router;
