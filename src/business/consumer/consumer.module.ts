import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConsumerEntity } from './consumer.entity';
import { ConsumerService } from './consumer.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConsumerEntity])],
  providers: [ConsumerService],
  exports: [TypeOrmModule],
})
export class ConsumerModule {}
