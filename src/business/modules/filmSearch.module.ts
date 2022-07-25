import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilmSearchController } from '@/business/controllers/filmSearch/filmSearch.controller';
import { FilmSearchEntity } from '@/business/repositories/filmSearch/filmSearch.entity';
import { FilmSearchRepository } from '@/business/repositories/filmSearch/filmSearch.repository';
import { FilmSearchService } from '@/business/services/filmSearch.service';

import { ConsumerModule } from './consumer.module';
import { SuscriptionModule } from './suscription.module';

@Module({
  controllers: [FilmSearchController],
  imports: [TypeOrmModule.forFeature([FilmSearchEntity]), ConsumerModule, SuscriptionModule],
  providers: [FilmSearchService, FilmSearchRepository],
  exports: [TypeOrmModule, FilmSearchService, FilmSearchRepository],
})
export class FilmSearchModule {}
