import { IsEmail, IsString, Matches, MinLength } from 'class-validator';
import { AUTH_MESSAGES, AUTH_REGEX } from '../constants/auth.constants';

export class AuthDto {
  @IsEmail()
  email!: string;

  @IsString()
  @Matches(AUTH_REGEX.NAME_REGEX, {
    message: AUTH_MESSAGES.NAME_MESSAGE,
  })
  name!: string;

  @IsString()
  @Matches(AUTH_REGEX.PASSWORD_REGEX, {
    message: AUTH_MESSAGES.PASSWORD_MESSAGE,
  })

  password!: string;

  @IsString()
  @Matches(AUTH_REGEX.PASSWORD_REGEX, {
    message: AUTH_MESSAGES.PASSWORD_MESSAGE,
  })
  confirmPassword!: string;
}
