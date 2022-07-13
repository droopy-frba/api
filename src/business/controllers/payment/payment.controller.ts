import { Controller } from '@nestjs/common';

import { PaymentService } from '@/business/services/payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private service: PaymentService) {}
}
