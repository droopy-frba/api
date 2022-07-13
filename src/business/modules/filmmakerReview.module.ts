import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilmmakerReviewController } from '@/business/controllers/filmmakerReview/filmmakerReview.controller';
import { FilmmakerReviewEntity } from '@/business/repositories/filmmakerReview/filmmakerReview.entity';
import { FilmmakerReviewRepository } from '@/business/repositories/filmmakerReview/filmmakerReview.repository';
import { FilmmakerReviewService } from '@/business/services/filmmakerReview.service';

@Module({
  controllers: [FilmmakerReviewController],
  imports: [TypeOrmModule.forFeature([FilmmakerReviewEntity])],
  providers: [FilmmakerReviewService, FilmmakerReviewRepository],
  exports: [TypeOrmModule, FilmmakerReviewService, FilmmakerReviewRepository],
})
export class FilmmakerReviewModule {}
