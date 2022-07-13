import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FilmmakerReviewEntity } from './filmmakerReview.entity';

@Injectable()
export class FilmmakerReviewRepository {
  constructor(
    @InjectRepository(FilmmakerReviewEntity)
    private repository: Repository<FilmmakerReviewEntity>,
  ) {}

  async save(user: FilmmakerReviewEntity) {
    return this.repository.save(user);
  }

  async delete(uuid: string) {
    return this.repository.delete(uuid);
  }
}
