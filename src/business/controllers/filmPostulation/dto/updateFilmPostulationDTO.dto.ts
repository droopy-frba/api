import { Optional } from '@nestjs/common';
import { IsEnum, IsString } from 'class-validator';

import { EFilmPostulationStatus } from '@/enums/filmPostulation.enums';

export class UpdateFilmPostulationDTO {
  @IsEnum(EFilmPostulationStatus)
  @Optional()
  status: EFilmPostulationStatus;

  // TODO: check how this integrates with agora
  @Optional()
  @IsString()
  stream: string;

  @Optional()
  @IsString()
  chat: string;
}
