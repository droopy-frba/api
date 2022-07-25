import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

import { Location } from '@/business/repositories/filmSearch/location';

export default class FilmSearchDTO {
  @Type(() => Location)
  location: Location;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  consumerUuid: string;

  @IsNumber()
  timeToExpiration: number; // in minutes
}
