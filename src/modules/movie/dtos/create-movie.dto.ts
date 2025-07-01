import { IsString, IsInt, Min, Max, IsNotEmpty, IsArray, IsEnum, Matches, ArrayNotEmpty } from 'class-validator';
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

  @IsArray()
  @IsString({ each: true })
  @Matches(MOVIE_REGEX.STARS_REGEX, {
    each: true,
    message: MOVIE_MESSAGES.STARS_MESSAGE,
  })
  @ArrayNotEmpty()
  actors!: string[];
}
