import { Controller } from '@nestjs/common';

import { FilmmakerReviewService } from './filmmakerReview.service';

@Controller('filmmaker_review')
export class FilmmakerReviewController {
  constructor(private service: FilmmakerReviewService) {}
}
