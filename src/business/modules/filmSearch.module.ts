import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilmSearchController } from '@/business/controllers/filmSearch/filmSearch.controller';
import { FilmSearchEntity } from '@/business/repositories/filmSearch/filmSearch.entity';
import { FilmSearchRepository } from '@/business/repositories/filmSearch/filmSearch.repository';
import { FilmSearchService } from '@/business/services/filmSearch.service';

@Module({
  controllers: [FilmSearchController],
  imports: [TypeOrmModule.forFeature([FilmSearchEntity])],
  providers: [FilmSearchService, FilmSearchRepository],
  exports: [TypeOrmModule, FilmSearchService, FilmSearchRepository],
})
export class FilmSearchModule {}
