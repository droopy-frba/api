import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilmmakerReviewEntity } from './filmmakerReview.entity';
import { FilmmakerReviewService } from './filmmakerReview.service';

@Module({
  imports: [TypeOrmModule.forFeature([FilmmakerReviewEntity])],
  providers: [FilmmakerReviewService],
  exports: [TypeOrmModule],
})
export class FilmmakerReviewModule {}
