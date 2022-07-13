import { Controller } from '@nestjs/common';

import { FilmSearchService } from '@/business/services/filmSearch.service';

@Controller('film_search')
export class FilmSearchController {
  constructor(private service: FilmSearchService) {}
}
