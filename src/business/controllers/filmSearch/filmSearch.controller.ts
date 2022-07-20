import { Body, Controller, Post } from '@nestjs/common';

import { FilmSearchService } from '@/business/services/filmSearch.service';

import FilmSearchDTO from './dto/filmsearch.dto';
import FindClosestFilmSearchDto from './dto/findClosestFilmSearch.dto';

@Controller('film_search')
export class FilmSearchController {
  constructor(private service: FilmSearchService) {}

  @Post('create')
  async createFilmSearch(@Body() body: FilmSearchDTO) {
    return this.service.createFilmSearch(body);
  }

  @Post('find_closests')
  async findClosestsTo(@Body() body: FindClosestFilmSearchDto) {
    return this.service.findClosestsTo(body);
  }
}
