import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SuscriptionEntity } from './suscription.entity';

@Injectable()
export class SuscriptionService {
  constructor(
    @InjectRepository(SuscriptionEntity)
    private repository: Repository<SuscriptionEntity>,
  ) {}
}
