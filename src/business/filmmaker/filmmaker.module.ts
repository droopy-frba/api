import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilmmakerEntity } from './filmmaker.entity';
import { FilmmakerRepository } from './filmmaker.repository';
import { FilmmakerService } from './filmmaker.service';

@Module({
  imports: [TypeOrmModule.forFeature([FilmmakerEntity])],
  providers: [FilmmakerService, FilmmakerRepository],
  exports: [TypeOrmModule, FilmmakerService, FilmmakerRepository],
})
export class FilmmakerModule {}
