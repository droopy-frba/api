import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaymentEntity } from './payment.entity';

@Injectable()
export class PaymentRepository {
  constructor(
    @InjectRepository(PaymentEntity)
    private repository: Repository<PaymentEntity>,
  ) {}

  async save(user: PaymentEntity) {
    return this.repository.save(user);
  }

  async delete(uuid: string) {
    return this.repository.delete(uuid);
  }
}
