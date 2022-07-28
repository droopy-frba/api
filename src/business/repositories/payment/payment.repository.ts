import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { PaymentEntity } from './payment.entity';

@Injectable()
export class PaymentRepository {
  constructor(
    @InjectRepository(PaymentEntity)
    private repository: Repository<PaymentEntity>,
  ) {}

  async save(payment: PaymentEntity, transaction?: EntityManager) {
    if (transaction) {
      return transaction.save(payment);
    }
    return this.repository.save(payment);
  }

  async delete(uuid: string) {
    return this.repository.delete(uuid);
  }
}
