import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FilmPostulationEntity } from './filmPostulation.entity';

@Injectable()
export class FilmPostulationRepository {
  constructor(
    @InjectRepository(FilmPostulationEntity)
    private repository: Repository<FilmPostulationEntity>,
  ) {}

  async save(user: FilmPostulationEntity) {
    return this.repository.save(user);
  }

  async delete(uuid: string) {
    return this.repository.delete(uuid);
  }

  async update(uuid: string, data: Partial<FilmPostulationEntity>) {
    return this.repository.update(uuid, data);
  }

  async findByFilmSearch(filmSearchUuid: string, page: number, size: number) {
    return this.repository.find({ where: { filmSearch: filmSearchUuid }, take: (page + 1) * size, skip: page * size });
  }

  async findByUuid(uuid: string) {
    return this.repository.findOne(uuid);
  }
}
