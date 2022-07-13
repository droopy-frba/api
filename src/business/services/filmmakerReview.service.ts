import { Injectable } from '@nestjs/common';

import { FilmmakerReviewRepository } from '@/business/repositories/filmmakerReview/filmmakerReview.repository';

@Injectable()
export class FilmmakerReviewService {
  constructor(private repository: FilmmakerReviewRepository) {}
}
