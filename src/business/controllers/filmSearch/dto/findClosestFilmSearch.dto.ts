import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

import { Location } from '@/business/repositories/filmSearch/location';

export default class FindClosestFilmSearchDTO {
  @Type(() => Location)
  location: Location;

  @IsNumber()
  maxDistance: number; // in km
}
