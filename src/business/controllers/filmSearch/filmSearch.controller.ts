import { Body, Controller, Post } from '@nestjs/common';

import { FilmSearchService } from '@/business/services/filmSearch.service';

import FilmSearchDTO from './dto/filmsearch.dto';

@Controller('film_search')
export class FilmSearchController {
  constructor(private service: FilmSearchService) {}

  @Post('create')
  async createFilmSearch(@Body() body: FilmSearchDTO) {
    return this.service.createFilmSearch(body);
  }
}
