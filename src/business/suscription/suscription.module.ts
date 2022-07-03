import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SuscriptionEntity } from './suscription.entity';
import { SuscriptionService } from './suscription.service';

@Module({
  imports: [TypeOrmModule.forFeature([SuscriptionEntity])],
  providers: [SuscriptionService],
  exports: [TypeOrmModule],
})
export class SuscriptionModule {}
