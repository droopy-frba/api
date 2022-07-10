import { Injectable } from '@nestjs/common';

import { ConsumerRepository } from './consumer.repository';

@Injectable()
export class ConsumerService {
  constructor(private repository: ConsumerRepository) {}
}
