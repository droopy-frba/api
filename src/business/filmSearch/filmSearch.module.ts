import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilmSearchEntity } from './filmSearch.entity';
import { FilmSearchService } from './filmSearch.service';

@Module({
  imports: [TypeOrmModule.forFeature([FilmSearchEntity])],
  providers: [FilmSearchService],
  exports: [TypeOrmModule],
})
export class FilmSearchModule {}
