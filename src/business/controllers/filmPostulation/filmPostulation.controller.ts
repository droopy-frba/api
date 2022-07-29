import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';

import { FilmPostulationService } from '@/business/services/filmPostulation.service';
import { JwtAuthGuard } from '@/guards/jwtAuth.guards';
import { LoggedRequest } from '@/interfaces/request.interfaces';

import { CreateFilmPostulationDTO } from './dto/createFilmPostulation.dto';
import { UpdateFilmPostulationDTO } from './dto/updateFilmPostulationDTO.dto';

@UseGuards(JwtAuthGuard)
@Controller('film_postulation')
export class FilmPostulationController {
  constructor(private service: FilmPostulationService) {}

  @Post('/:uuid/video-call/')
  async createVideoConnection(@Param('uuid') uuid: string, @Request() req: LoggedRequest) {
    return this.service.createVideoConnection(uuid, req.user);
  }

  @Post('/')
  async create(@Request() req: LoggedRequest, @Body() body: CreateFilmPostulationDTO) {
    return this.service.create(req.user, body.filmSearchUuid);
  }

  @Patch('/:uuid')
  async update(@Param('uuid') uuid: string, @Request() req: LoggedRequest, @Body() body: UpdateFilmPostulationDTO) {
    return this.service.update(uuid, req.user, body);
  }

  @Get(':uuid')
  async find(@Param() uuid: string) {
    return this.service.findByUuid(uuid);
  }
}
