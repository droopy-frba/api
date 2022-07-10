import { IsEmail, IsEnum, IsString, Matches } from 'class-validator';

import { EUserRole } from '@/enums/user.enums';
import { PASSWORD_REGEX } from '@/helpers/validations.helpers';

import { ConsumerDTO } from './consumer.dto';
import { FilmmakerDTO } from './filmmaker.dto';

export class SignupDTO {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @Matches(PASSWORD_REGEX, { message: 'Password too weak' })
  password: string;

  @IsEnum(EUserRole)
  role: EUserRole;

  consumer?: ConsumerDTO;

  filmmaker?: FilmmakerDTO;
}
