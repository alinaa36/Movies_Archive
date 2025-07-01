import { IsString, IsInt, Min, Max, IsNotEmpty, IsArray, IsEnum, Matches } from 'class-validator';
import { MovieFormat } from '../enum/format.enum';
import { MOVIE_MESSAGES, MOVIE_REGEX } from '../constants/movie.constants';

export class CreateMovieDto {

  @IsString()
  @IsNotEmpty()
  @Matches(MOVIE_REGEX.TITLE_REGEX, {
    message: MOVIE_MESSAGES.TITLE_MESSAGE,
  })
  title!: string;

  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear())
  year!: number;

  @IsEnum(MovieFormat)
  format!: MovieFormat;

  @IsString()
  @IsNotEmpty()
  @Matches(MOVIE_REGEX.STARS_REGEX, {
    message: MOVIE_MESSAGES.STARS_MESSAGE,
  })
  stars!: string;
}
