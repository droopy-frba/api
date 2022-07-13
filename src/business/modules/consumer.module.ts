import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConsumerController } from '@/business/controllers/consumer/consumer.controller';
import { ConsumerEntity } from '@/business/repositories/consumer/consumer.entity';
import { ConsumerRepository } from '@/business/repositories/consumer/consumer.repository';
import { ConsumerService } from '@/business/services/consumer.service';

@Module({
  controllers: [ConsumerController],
  imports: [TypeOrmModule.forFeature([ConsumerEntity])],
  providers: [ConsumerService, ConsumerRepository],
  exports: [TypeOrmModule, ConsumerService, ConsumerRepository],
})
export class ConsumerModule {}
