import { Op, type CreationAttributes } from 'sequelize';
import { Movie } from '../models/movie.models';
import { QueryMovieDto } from '../dtos/query-movie.dto';

export class movieRepository {
  async createMovie(data: CreationAttributes<Movie>) {
    return await Movie.create(data);
  }

  async findMovies(query: QueryMovieDto) {
    const where: any = {};

    if (query.title) {
      where.title = { [Op.like]: `%${query.title}%` };
    }

    if (query.year) {
      where.year = query.year;
    }

    if (query.format) {
      where.format = { [Op.iLike]: query.format }; // iLike для SQLite не обов'язковий
    }

    if (query.stars) {
      where.stars = { [Op.like]: `%${query.stars}%` };
    }

    const orderField = query.sort || 'id';
    const orderDirection = query.order || 'ASC';

    const limit = query.limit || 20;
    const offset = query.offset || 0;

    return await Movie.findAndCountAll({
      where,
      limit,
      offset,
      order: [[orderField, orderDirection]],
    });
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


}
