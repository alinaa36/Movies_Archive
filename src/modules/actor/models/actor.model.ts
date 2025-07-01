import { Movie } from '#modules/movie/models/movie.models.js';
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  BelongsToMany,
} from 'sequelize-typescript';
import { MovieActor } from './movie-actor.model';


@Table({ tableName: 'actors', timestamps: true })
export class Actor extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @BelongsToMany(() => Movie, () => MovieActor)
  movies!: Movie[];
}
