import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilmPostulationController } from '@/business/controllers/filmPostulation/filmPostulation.controller';
import { FilmPostulationEntity } from '@/business/repositories/filmPostulation/filmPostulation.entity';
import { FilmPostulationRepository } from '@/business/repositories/filmPostulation/filmPostulation.repository';
import { FilmSearchRepository } from '@/business/repositories/filmSearch/filmSearch.repository';
import { FilmmakerRepository } from '@/business/repositories/filmmaker/filmmaker.repository';
import { FilmPostulationService } from '@/business/services/filmPostulation.service';

import { FilmSearchModule } from './filmSearch.module';
import { FilmmakerModule } from './filmmaker.module';

@Module({
  controllers: [FilmPostulationController],
  imports: [TypeOrmModule.forFeature([FilmPostulationEntity]), FilmmakerModule, FilmSearchModule],
  providers: [FilmPostulationService, FilmPostulationRepository, FilmmakerRepository, FilmSearchRepository],
  exports: [TypeOrmModule, FilmPostulationService, FilmPostulationRepository],
})
export class FilmPostulationModule {}
