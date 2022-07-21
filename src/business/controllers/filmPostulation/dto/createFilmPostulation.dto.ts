import { IsString } from 'class-validator';

export class CreateFilmPostulationDTO {
  @IsString()
  filmmakerUuid: string;

  @IsString()
  filmSearchUuid: string;
}
