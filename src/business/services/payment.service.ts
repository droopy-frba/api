import { Injectable } from '@nestjs/common';

import { PaymentRepository } from '@/business/repositories/payment/payment.repository';

@Injectable()
export class PaymentService {
  constructor(private repository: PaymentRepository) {}
}
