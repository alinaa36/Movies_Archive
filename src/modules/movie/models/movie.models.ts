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
} from 'sequelize-typescript';
import { MovieFormat } from '../enum/format.enum';

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

  @AllowNull(false)
  @Column(DataType.STRING)
  declare stars: string;
}
