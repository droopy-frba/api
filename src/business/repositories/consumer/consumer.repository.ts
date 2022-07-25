import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository, TransactionManager } from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { ConsumerEntity } from './consumer.entity';

@Injectable()
export class ConsumerRepository {
  constructor(
    @InjectRepository(ConsumerEntity)
    private repository: Repository<ConsumerEntity>,
  ) {}

  async findByUser(user: UserEntity) {
    return this.repository.findOne({ user });
  }

  async save(consumer: ConsumerEntity, @TransactionManager() transactionManager?: EntityManager) {
    if (transactionManager) {
      return transactionManager.save(ConsumerEntity, consumer);
    }
    return this.repository.save(consumer);
  }

  async delete(uuid: string) {
    return this.repository.delete(uuid);
  }

  async findOne(uuid: string) {
    return this.repository.findOne({ uuid });
  }
}
