import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SuscriptionController } from '@/business/controllers/suscription/suscription.controller';
import { SuscriptionEntity } from '@/business/repositories/suscription/suscription.entity';
import { SuscriptionRepository } from '@/business/repositories/suscription/suscription.repository';
import { SuscriptionService } from '@/business/services/suscription.service';

@Module({
  controllers: [SuscriptionController],
  imports: [TypeOrmModule.forFeature([SuscriptionEntity])],
  providers: [SuscriptionService, SuscriptionRepository],
  exports: [TypeOrmModule, SuscriptionService, SuscriptionRepository],
})
export class SuscriptionModule {}
