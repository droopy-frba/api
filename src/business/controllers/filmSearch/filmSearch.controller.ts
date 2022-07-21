import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { FilmSearchService } from '@/business/services/filmSearch.service';

import FilmSearchDTO from './dto/filmsearch.dto';
import FindClosestFilmSearchDTO from './dto/findClosestFilmSearch.dto';
import UpdateFilmSearchDTO from './dto/updateFilmSearch.dto';

@Controller('film_search')
export class FilmSearchController {
  constructor(private service: FilmSearchService) {}

  @Post('create')
  async create(@Body() body: FilmSearchDTO) {
    return this.service.create(body);
  }

  @Post('find_closests')
  async findClosestsTo(@Body() body: FindClosestFilmSearchDTO) {
    return this.service.findClosestsTo(body);
  }

  @Post('update')
  async update(@Query('uuid') uuid: string, @Body() body: UpdateFilmSearchDTO) {
    return this.service.update(uuid, body);
  }

  @Get('find')
  async findByUuid(@Query('uuid') uuid: string) {
    return this.service.findByUuid(uuid);
  }

  @Post('delete')
  async delete(@Query('uuid') uuid: string) {
    return this.service.delete(uuid);
  }
}
