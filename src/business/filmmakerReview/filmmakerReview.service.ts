import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FilmmakerReviewEntity } from './filmmakerReview.entity';

@Injectable()
export class FilmmakerReviewService {
  constructor(
    @InjectRepository(FilmmakerReviewEntity)
    private repository: Repository<FilmmakerReviewEntity>,
  ) {}
}
