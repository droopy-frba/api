import { IsNumber, IsString } from 'class-validator';

export class SuscriptionDTO {
  @IsString()
  cardId: string;

  @IsString()
  product: string;

  @IsNumber()
  hours: number;
}
