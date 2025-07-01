import { ArrayNotEmpty, IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { MovieFormat } from '../enum/format.enum';

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  year?: number;

  @IsOptional()
  @IsEnum(MovieFormat)
  format?: MovieFormat;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  actors!: string[];
}
