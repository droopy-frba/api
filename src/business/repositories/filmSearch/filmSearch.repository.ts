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
}
