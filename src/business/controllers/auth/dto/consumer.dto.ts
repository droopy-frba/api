import { IsString } from 'class-validator';

export class ConsumerDTO {
  @IsString()
  name: string;

  @IsString()
  identifier: string;
}
