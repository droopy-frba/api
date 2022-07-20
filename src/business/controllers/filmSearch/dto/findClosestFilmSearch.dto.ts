import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

import { Location } from '@/business/repositories/filmSearch/location';

export default class FindClosestFilmSearchDto {
  @Type(() => Location)
  location: Location;

  @IsNumber()
  maxDistance: number; // in km
}
