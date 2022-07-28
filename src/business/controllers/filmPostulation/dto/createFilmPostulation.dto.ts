import { IsString } from 'class-validator';

export class CreateFilmPostulationDTO {
  @IsString()
  filmSearchUuid: string;
}
