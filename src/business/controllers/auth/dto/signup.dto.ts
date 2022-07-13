import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional, IsString, Matches, MinLength, ValidateNested } from 'class-validator';

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
  @MinLength(8, { message: 'Password must have at least 8 characters' })
  password: string;

  @IsEnum(EUserRole)
  role: EUserRole;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ConsumerDTO)
  consumer?: ConsumerDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FilmmakerDTO)
  filmmaker?: FilmmakerDTO;
}
