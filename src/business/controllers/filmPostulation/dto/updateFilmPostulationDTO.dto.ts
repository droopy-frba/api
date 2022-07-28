import { IsEnum, IsOptional, IsString } from 'class-validator';

import { EFilmPostulationStatus } from '@/enums/filmPostulation.enums';

export class UpdateFilmPostulationDTO {
  @IsEnum(EFilmPostulationStatus)
  @IsOptional()
  status?: EFilmPostulationStatus;

  @IsString()
  @IsOptional()
  stream?: string;

  @IsString()
  @IsOptional()
  chat?: string;
}
