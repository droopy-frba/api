import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository, TransactionManager } from 'typeorm';

import { ConsumerEntity } from './consumer.entity';

@Injectable()
export class ConsumerRepository {
  constructor(
    @InjectRepository(ConsumerEntity)
    private repository: Repository<ConsumerEntity>,
  ) {}

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
