import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilmPostulationEntity } from './filmPostulation.entity';
import { FilmPostulationService } from './filmPostulation.service';

@Module({
  imports: [TypeOrmModule.forFeature([FilmPostulationEntity])],
  providers: [FilmPostulationService],
  exports: [TypeOrmModule],
})
export class FilmPostulationModule {}
