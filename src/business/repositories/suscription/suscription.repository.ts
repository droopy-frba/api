import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompanyEntity } from '../company/company.entity';
import { SuscriptionEntity } from './suscription.entity';

@Injectable()
export class SuscriptionRepository {
  constructor(
    @InjectRepository(SuscriptionEntity)
    private repository: Repository<SuscriptionEntity>,
  ) {}

  async save(user: SuscriptionEntity) {
    return this.repository.save(user);
  }

  async delete(uuid: string) {
    return this.repository.delete(uuid);
  }

  async findByCompany(company: CompanyEntity) {
    return this.repository.findOne({ company });
  }
}
