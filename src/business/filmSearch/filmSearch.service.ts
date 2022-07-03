import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FilmSearchEntity } from './filmSearch.entity';

@Injectable()
export class FilmSearchService {
  constructor(
    @InjectRepository(FilmSearchEntity)
    private repository: Repository<FilmSearchEntity>,
  ) {}
}
