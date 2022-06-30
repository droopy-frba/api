import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FilmmakerEntity } from './filmmaker.entity';

@Injectable()
export class FilmmakerService {
  constructor(
    @InjectRepository(FilmmakerEntity)
    private repository: Repository<FilmmakerEntity>,
  ) {}
}
