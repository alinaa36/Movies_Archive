import { Movie } from '#modules/movie/models/movie.models.js';
import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { Actor } from './actor.model';

@Table({ tableName: 'movie_actors', timestamps: false })
export class MovieActor extends Model {
  @ForeignKey(() => Movie)
  @Column(DataType.INTEGER)
  movieId!: number;

  @ForeignKey(() => Actor)
  @Column(DataType.INTEGER)
  actorId!: number;
}
