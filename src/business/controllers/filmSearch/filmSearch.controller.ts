import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFloatPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';

import { FilmSearchService } from '@/business/services/filmSearch.service';
import { JwtAuthGuard } from '@/guards/jwtAuth.guards';
import { LoggedRequest } from '@/interfaces/request.interfaces';

import FilmSearchDTO from './dto/filmsearch.dto';
import UpdateFilmSearchDTO from './dto/updateFilmSearch.dto';

@UseGuards(JwtAuthGuard)
@Controller('film_search')
export class FilmSearchController {
  constructor(private service: FilmSearchService) {}

  @Post('/')
  async create(@Request() req: LoggedRequest, @Body() body: FilmSearchDTO) {
    return this.service.create(req.user, body);
  }

  @Get('/closests')
  async findClosests(
    @Query('latitude', ParseFloatPipe) latitude: number,
    @Query('longitude', ParseFloatPipe) longitude: number,
    @Query('maxDistance', ParseFloatPipe) maxDistance: number,
  ) {
    return this.service.findClosests(latitude, longitude, maxDistance);
  }

  @Get('/:uuid/film_postulations')
  async findByFilmSearch(
    @Param('uuid') uuid: string,
    @Query('limit', ParseFloatPipe) limit: number,
    @Query('offset', ParseFloatPipe) offset: number,
  ) {
    return this.service.findPostulations(uuid, limit, offset);
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
