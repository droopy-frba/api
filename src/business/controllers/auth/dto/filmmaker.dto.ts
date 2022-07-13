import { IsString } from 'class-validator';

export class FilmmakerDTO {
  @IsString()
  phoneBrand: string;

  @IsString()
  phoneModel: string;
}
