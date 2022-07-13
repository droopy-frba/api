import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentController } from '@/business/controllers/payment/payment.controller';
import { PaymentEntity } from '@/business/repositories/payment/payment.entity';
import { PaymentRepository } from '@/business/repositories/payment/payment.repository';
import { PaymentService } from '@/business/services/payment.service';

@Module({
  controllers: [PaymentController],
  imports: [TypeOrmModule.forFeature([PaymentEntity])],
  providers: [PaymentService, PaymentRepository],
  exports: [TypeOrmModule, PaymentRepository],
})
export class PaymentModule {}
