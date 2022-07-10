import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ConsumerEntity } from './consumer.entity';

@Injectable()
export class ConsumerRepository {
  constructor(
    @InjectRepository(ConsumerEntity)
    private repository: Repository<ConsumerEntity>,
  ) {}

  async save(user: ConsumerEntity) {
    return this.repository.save(user);
  }
}
