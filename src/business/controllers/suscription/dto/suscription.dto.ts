import { IsNumber, IsString } from 'class-validator';

export class SuscriptionDTO {
  @IsString()
  product: string;

  @IsNumber()
  hours: number;
}
