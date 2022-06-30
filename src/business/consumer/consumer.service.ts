import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ConsumerEntity } from './consumer.entity';

@Injectable()
export class ConsumerService {
  constructor(
    @InjectRepository(ConsumerEntity)
    private repository: Repository<ConsumerEntity>,
  ) {}
}
