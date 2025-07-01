import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
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
import { MovieFormat } from '../enum/format.enum';
import { Actor } from '#modules/actor/models/actor.model.js';
import { MovieActor } from '#modules/actor/models/movie-actor.model.js';

@Table({
  tableName: 'movies',
  timestamps: false,
})
export class Movie extends Model<
  InferAttributes<Movie>,
  InferCreationAttributes<Movie>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: CreationOptional<number>;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare title: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare year: number;

  @AllowNull(false)
  @Column(DataType.ENUM(...Object.values(MovieFormat)))
  declare format: MovieFormat;

  @BelongsToMany(() => Actor, () => MovieActor)
  actors!: Actor[];
}
