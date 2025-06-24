import { IsString, IsInt, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateMovieDto {

  @IsString()
  title!: string;

  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear())
  year!: number;

  @IsString()
  format!: string;
  
  @IsString()
  stars!: string;
}
