import { Movie } from '../modules/movie/models/movie.models';
import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'src/database/database.sqlite',
  models: [Movie],
});
