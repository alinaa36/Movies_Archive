import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email!: string;
  @IsString()
  name!: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string;

  @IsString()
  @MinLength(6, { message: 'Confirm password must be at least 6 characters long' })
  confirmPassword!: string;
}
