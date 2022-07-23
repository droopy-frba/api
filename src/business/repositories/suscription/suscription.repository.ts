import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { SuscriptionEntity } from './suscription.entity';

@Injectable()
export class SuscriptionRepository {
  constructor(
    @InjectRepository(SuscriptionEntity)
    private repository: Repository<SuscriptionEntity>,
  ) {}

  async findById(uuid: string) {
    return this.repository.findOne({ uuid });
  }

  async save(suscription: SuscriptionEntity, transaction?: EntityManager) {
    if (transaction) {
      return transaction.save(suscription);
    }
    return this.repository.save(suscription);
  }

  async delete(uuid: string) {
    return this.repository.delete(uuid);
  }
}
