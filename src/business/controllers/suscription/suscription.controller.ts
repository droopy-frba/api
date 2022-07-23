import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';

import { SuscriptionService } from '@/business/services/suscription.service';
import { JwtAuthGuard } from '@/guards/jwtAuth.guards';
import { LoggedRequest } from '@/interfaces/request.interfaces';

import { SuscriptionDTO } from './dto/suscription.dto';

@Controller('suscription')
export class SuscriptionController {
  constructor(private service: SuscriptionService) {}

  @UseGuards(JwtAuthGuard)
  @Post('new')
  async create(@Request() req: LoggedRequest, @Body() suscription: SuscriptionDTO) {
    return this.service.create(req.user, suscription);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.service.findById(id);
  }
}
