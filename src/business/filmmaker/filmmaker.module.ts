import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilmmakerEntity } from './filmmaker.entity';
import { FilmmakerService } from './filmmaker.service';

@Module({
  imports: [TypeOrmModule.forFeature([FilmmakerEntity])],
  providers: [FilmmakerService],
  exports: [TypeOrmModule],
})
export class FilmmakerModule {}
