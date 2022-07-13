import { Injectable } from '@nestjs/common';

import { ConsumerRepository } from '@/business/repositories/consumer/consumer.repository';

@Injectable()
export class ConsumerService {
  constructor(private repository: ConsumerRepository) {}
}
