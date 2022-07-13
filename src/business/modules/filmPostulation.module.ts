import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilmPostulationController } from '@/business/controllers/filmPostulation/filmPostulation.controller';
import { FilmPostulationEntity } from '@/business/repositories/filmPostulation/filmPostulation.entity';
import { FilmPostulationRepository } from '@/business/repositories/filmPostulation/filmPostulation.repository';
import { FilmPostulationService } from '@/business/services/filmPostulation.service';

@Module({
  controllers: [FilmPostulationController],
  imports: [TypeOrmModule.forFeature([FilmPostulationEntity])],
  providers: [FilmPostulationService, FilmPostulationRepository],
  exports: [TypeOrmModule, FilmPostulationService, FilmPostulationRepository],
})
export class FilmPostulationModule {}
