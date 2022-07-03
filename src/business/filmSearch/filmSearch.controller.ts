import { Controller } from '@nestjs/common';

import { FilmSearchService } from './filmSearch.service';

@Controller('film_search')
export class FilmSearchController {
  constructor(private service: FilmSearchService) {}
}
