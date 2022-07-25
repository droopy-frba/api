import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository, TransactionManager } from 'typeorm';

import { UserEntity } from '../user/user.entity';
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

  async findByUser(user: UserEntity) {
    return this.repository.findOne({ where: { user: user.uuid } });
  }

  async delete(uuid: string) {
    return this.repository.delete(uuid);
  }

  async findByUuid(uuid: string) {
    return this.repository.findOne(uuid);
  }
}
