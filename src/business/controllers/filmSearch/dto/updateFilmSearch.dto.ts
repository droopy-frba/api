import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { Location } from '@/business/repositories/filmSearch/location';
import { EFilmSearchStatus } from '@/enums/filmSearch.enums';

export default class UpdateFilmSearchDTO {
  @IsOptional()
  @Type(() => Location)
  location?: Location;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  consumerUuid?: string;

  @IsOptional()
  @IsNumber()
  timeToExpiration?: number; // in minutes

  @IsOptional()
  @IsEnum(EFilmSearchStatus)
  status?: EFilmSearchStatus;

  @IsOptional()
  @IsNumber()
  review?: number;
}
