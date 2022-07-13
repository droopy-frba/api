import { Injectable } from '@nestjs/common';

import { FilmSearchRepository } from '@/business/repositories/filmSearch/filmSearch.repository';

@Injectable()
export class FilmSearchService {
  constructor(private repository: FilmSearchRepository) {}
}
