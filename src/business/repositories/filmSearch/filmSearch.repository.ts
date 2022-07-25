import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  async findOne(uuid: string) {
    return this.repository.findOne(uuid);
  }

  async update(uuid: string, data: Partial<FilmSearchEntity>) {
    return this.repository.update(uuid, data);
  }

  async findClosests(latitude: number, longitude: number, maxDistance: number) {
    const selectQuery = `uuid, title, description, locationLatitude, locationLongitude, locationDescription, 
    (SQRT(POW(69.1 * (locationLatitude - :lat), 2) + POW(69.1 * (:lon - locationLongitude)
     * COS(locationLatitude / 57.3), 2)))*1.6 AS distance`;
    return this.repository
      .createQueryBuilder()
      .select(selectQuery)
      .setParameters({ lat: latitude, lon: longitude })
      .having('distance < :dist', { dist: maxDistance })
      .orderBy('distance')
      .getRawMany();
  }
}
