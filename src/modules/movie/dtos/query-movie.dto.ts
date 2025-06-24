import { IsOptional, IsString, IsInt, Min, Max, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryMovieDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  year?: number;

  @IsOptional()
  @IsString()
  format?: string;

  @IsOptional()
  @IsString()
  stars?: string;

  @IsOptional()
  @IsIn(['id', 'title', 'year'])
  sort?: 'id' | 'title' | 'year';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC';

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @Min(0)
  limit?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @Min(0)
  offset?: number;
}
