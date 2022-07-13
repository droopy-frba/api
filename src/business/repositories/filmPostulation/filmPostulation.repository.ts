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
}
