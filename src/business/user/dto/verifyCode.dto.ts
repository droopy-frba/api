import { IsEmail, IsNumber, IsString } from 'class-validator';

export class VerifyCodeDTO {
  @IsNumber()
  code: number;

  @IsEmail()
  @IsString()
  email: string;
}
