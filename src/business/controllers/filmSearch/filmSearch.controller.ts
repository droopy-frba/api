import { Body, Controller, Delete, Get, Param, ParseFloatPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { FilmSearchService } from '@/business/services/filmSearch.service';
import { JwtAuthGuard } from '@/guards/jwtAuth.guards';

import FilmSearchDTO from './dto/filmsearch.dto';
import UpdateFilmSearchDTO from './dto/updateFilmSearch.dto';

@UseGuards(JwtAuthGuard)
@Controller('film_search')
export class FilmSearchController {
  constructor(private service: FilmSearchService) {}

  @Post('/')
  async create(@Body() body: FilmSearchDTO) {
    return this.service.create(body);
  }

  @Get('/closests')
  async findClosests(
    @Query('latitude', ParseFloatPipe) latitude: number,
    @Query('longitude', ParseFloatPipe) longitude: number,
    @Query('maxDistance', ParseFloatPipe) maxDistance: number,
  ) {
    return this.service.findClosests(latitude, longitude, maxDistance);
  }

  @Get('/:uuid')
  async findByUuid(@Param('uuid') uuid: string) {
    return this.service.findByUuid(uuid);
  }

  @Patch('/:uuid')
  async update(@Param('uuid') uuid: string, @Body() body: UpdateFilmSearchDTO) {
    return this.service.update(uuid, body);
  }

  @Delete('/:uuid')
  async delete(@Param('uuid') uuid: string) {
    return this.service.delete(uuid);
  }
}
