import { Actor } from '#modules/actor/models/actor.model.js';
import { MovieActor } from '#modules/actor/models/movie-actor.model.js';
import { User } from '../modules/auth/models/user.model';
import { Movie } from '../modules/movie/models/movie.models';
import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'src/database/database.sqlite',
  models: [Movie, User, Actor, MovieActor],
});
