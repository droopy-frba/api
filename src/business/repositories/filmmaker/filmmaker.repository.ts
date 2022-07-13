import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository, TransactionManager } from 'typeorm';

import { FilmmakerEntity } from './filmmaker.entity';

@Injectable()
export class FilmmakerRepository {
  constructor(
    @InjectRepository(FilmmakerEntity)
    private repository: Repository<FilmmakerEntity>,
  ) {}

  async save(filmmaker: FilmmakerEntity, @TransactionManager() transactionManager?: EntityManager) {
    if (transactionManager) {
      return transactionManager.save(FilmmakerEntity, filmmaker);
    }
    return this.repository.save(filmmaker);
  }

  async delete(uuid: string) {
    return this.repository.delete(uuid);
  }
}
