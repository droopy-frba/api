import { Controller } from '@nestjs/common';

import { FilmmakerReviewService } from '@/business/services/filmmakerReview.service';

@Controller('filmmaker_review')
export class FilmmakerReviewController {
  constructor(private service: FilmmakerReviewService) {}
}
