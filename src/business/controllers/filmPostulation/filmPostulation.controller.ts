import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { FilmPostulationService } from '@/business/services/filmPostulation.service';
import { ParseNumberPipe } from '@/pipes/parseNumber.pipes';

import { CreateFilmPostulationDTO } from './dto/createFilmPostulation.dto';
import { UpdateFilmPostulationDTO } from './dto/updateFilmPostulationDTO.dto';

@Controller('film_postulation')
export class FilmPostulationController {
  constructor(private service: FilmPostulationService) {}

  @Post('/')
  async create(@Body() body: CreateFilmPostulationDTO) {
    return this.service.create(body);
  }

  @Patch('/:uuid')
  async update(@Param('uuid') uuid: string, @Body() body: UpdateFilmPostulationDTO) {
    return this.service.update(uuid, body);
  }

  @Get('/film-search/:filmSearchUuid')
  async findByFilmSearch(
    @Param(':filmSearchUuid') filmSearchUuid: string,
    @Query('page', ParseNumberPipe) page: number,
    @Query('size', ParseNumberPipe) size: number,
  ) {
    return this.service.findByFilmSearch(filmSearchUuid, page, size);
  }

  @Get(':uuid')
  async find(@Param() uuid: string) {
    return this.service.findByUuid(uuid);
  }
}
