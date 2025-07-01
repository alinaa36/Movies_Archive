import { Op, type CreationAttributes } from 'sequelize';
import { Movie } from '../models/movie.models';
import { QueryMovieDto } from '../dtos/query-movie.dto';
import { sequelize } from '#database/database.config.js';
import { Actor } from '#modules/actor/models/actor.model.js';

export class movieRepository {
  async createMovie(data: CreationAttributes<Movie>) {
    return await Movie.create(data);
  }

  async findMovies(query: QueryMovieDto) {
    const where: any = {};

    if (query.title) {
      where.title = { [Op.like]: `%${query.title.toLocaleLowerCase()}%` };
    }

    if (query.year) {
      where.year = query.year;
    }

    if (query.format) {
      where.format = { [Op.like]: query.format.toLocaleLowerCase() };
    }

    const include = query.actor
      ? [
          {
            model: Actor,
            where: {
              name: { [Op.like]: `%${query.actor.toLocaleLowerCase()}%` },
            },
            through: { attributes: [] },
            required: true,
          },
        ]
      : [
          {
            model: Actor,
            through: { attributes: [] },
          },
        ];

    const limit = query.limit || 20;
    const offset = query.offset || 0;

    const result = await Movie.findAndCountAll({
      where,
      include,
      limit,
      offset,
      order: [
        [
          query.sort && query.sort !== 'title'
            ? sequelize.col(`Movie.${query.sort}`)
            : 'id',
          query.order || 'ASC',
        ],
      ],
    });

    if (query.sort === 'title') {
      result.rows.sort((a, b) => {
        return (
          a.title.localeCompare(b.title, 'uk', { sensitivity: 'base' }) *
          (query.order === 'DESC' ? -1 : 1)
        );
      });
    }

    return result;
  }
  async findMovieById(id: number) {
    return await Movie.findByPk(id);
  }

  async updateMovie(id: number, data: CreationAttributes<Movie>) {
    const movie = await this.findMovieById(id);
    return movie?.update(data);
  }

  async deleteMovie(id: number) {
    const movie = await this.findMovieById(id);
    await movie?.destroy();
  }

  async findFullMovie(id: number) {
    return await Movie.findByPk(id, {
      include: {
        model: Actor,
        through: { attributes: [] },
      },
    });
  }
}
