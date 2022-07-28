import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SuscriptionController } from '@/business/controllers/suscription/suscription.controller';
import { SuscriptionEntity } from '@/business/repositories/suscription/suscription.entity';
import { SuscriptionRepository } from '@/business/repositories/suscription/suscription.repository';
import { SuscriptionService } from '@/business/services/suscription.service';

import { ConsumerRepository } from '../repositories/consumer/consumer.repository';
import { PaymentRepository } from '../repositories/payment/payment.repository';
import { ProductRepository } from '../repositories/product/product.repository';
import { ConsumerModule } from './consumer.module';
import { PaymentModule } from './payment.module';
import { ProductModule } from './product.module';

@Module({
  controllers: [SuscriptionController],
  imports: [TypeOrmModule.forFeature([SuscriptionEntity]), ConsumerModule, ProductModule, PaymentModule],
  providers: [SuscriptionService, SuscriptionRepository, ConsumerRepository, ProductRepository, PaymentRepository],
  exports: [TypeOrmModule, SuscriptionService, SuscriptionRepository],
})
export class SuscriptionModule {}
