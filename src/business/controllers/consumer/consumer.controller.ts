import { Controller } from '@nestjs/common';

import { ConsumerService } from '@/business/services/consumer.service';

@Controller('consumer')
export class ConsumerController {
  constructor(private service: ConsumerService) {}
}
