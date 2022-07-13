import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilmmakerController } from '@/business/controllers/filmmaker/filmmaker.controller';
import { FilmmakerEntity } from '@/business/repositories/filmmaker/filmmaker.entity';
import { FilmmakerRepository } from '@/business/repositories/filmmaker/filmmaker.repository';
import { FilmmakerService } from '@/business/services/filmmaker.service';

@Module({
  controllers: [FilmmakerController],
  imports: [TypeOrmModule.forFeature([FilmmakerEntity])],
  providers: [FilmmakerService, FilmmakerRepository],
  exports: [TypeOrmModule, FilmmakerService, FilmmakerRepository],
})
export class FilmmakerModule {}
