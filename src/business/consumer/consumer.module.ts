import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConsumerEntity } from './consumer.entity';
import { ConsumerRepository } from './consumer.repository';
import { ConsumerService } from './consumer.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConsumerEntity])],
  providers: [ConsumerService, ConsumerRepository],
  exports: [TypeOrmModule, ConsumerService, ConsumerRepository],
})
export class ConsumerModule {}
