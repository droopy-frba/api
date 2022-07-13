import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FilmmakerEntity } from './filmmaker.entity';

@Injectable()
export class FilmmakerRepository {
  constructor(
    @InjectRepository(FilmmakerEntity)
    private repository: Repository<FilmmakerEntity>,
  ) {}

  async save(user: FilmmakerEntity) {
    return this.repository.save(user);
  }

  async delete(uuid: string) {
    return this.repository.delete(uuid);
  }
}
