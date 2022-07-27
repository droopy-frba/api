import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';

import { SuscriptionService } from '@/business/services/suscription.service';
import { JwtAuthGuard } from '@/guards/jwtAuth.guards';
import { LoggedRequest } from '@/interfaces/request.interfaces';

import { SuscriptionDTO } from './dto/suscription.dto';
import { SuscriptionValidationDTO } from './dto/suscriptionValidation.dto';

@UseGuards(JwtAuthGuard)
@Controller('suscription')
export class SuscriptionController {
  constructor(private service: SuscriptionService) {}

  @Post('new')
  async create(@Body() suscription: SuscriptionDTO, @Request() req: LoggedRequest) {
    return this.service.create(req.user, suscription);
  }

  @Post('validate')
  async validate(@Body() suscriptionValidation: SuscriptionValidationDTO) {
    return this.service.validateCheckout(suscriptionValidation.suscriptionUuid);
  }

  @Get(':uuid')
  async findById(@Param('uuid') id: string) {
    return this.service.findById(id);
  }
}
