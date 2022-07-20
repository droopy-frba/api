import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import FindClosestFilmSearchDto from '@/business/controllers/filmSearch/dto/findClosestFilmSearch.dto';

import { FilmSearchEntity } from './filmSearch.entity';

@Injectable()
export class FilmSearchRepository {
  constructor(
    @InjectRepository(FilmSearchEntity)
    private repository: Repository<FilmSearchEntity>,
  ) {}

  async save(user: FilmSearchEntity) {
    return this.repository.save(user);
  }

  async delete(uuid: string) {
    return this.repository.delete(uuid);
  }

  async findClosestsTo(body: FindClosestFilmSearchDto) {
    const query =
      'SELECT uuid, title, description, locationLatitude, locationLongitude, locationDescription, (SQRT(POW(69.1 * (locationLatitude - ?), 2) + POW(69.1 * (? - locationLongitude) * COS(locationLatitude / 57.3), 2)))*1.6 AS distance FROM film_search HAVING distance < ? ORDER BY distance;';
    return this.repository.query(query, [body.location.latitude, body.location.longitude, body.maxDistance]);
  }
}
