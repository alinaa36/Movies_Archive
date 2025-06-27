import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateMovieDto {
    @IsOptional()
    @IsString()
    title?: string;
    
    @IsOptional()
    @IsNumber()
    year?: number;
    
    @IsOptional()
    @IsString()
    format?: string;
    
    @IsOptional()
    @IsString()
    stars?: string;
}