import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { CompanyEntity } from '../company/company.entity';
import { PaymentEntity } from '../payment/payment.entity';
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

  async findByCompany(company: CompanyEntity) {
    return this.repository.findOne({ company });
  }

  async findByPayment(payment: PaymentEntity) {
    return this.repository.findOne({ payment });
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
