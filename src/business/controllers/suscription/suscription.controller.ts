import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';

import { SuscriptionService } from '@/business/services/suscription.service';
import { JwtAuthGuard } from '@/guards/jwtAuth.guards';
import { LoggedRequest } from '@/interfaces/request.interfaces';

import { NotificationMercadoPagoDTO } from './dto/notificationMercadoPago';
import { SuscriptionDTO } from './dto/suscription.dto';

@UseGuards(JwtAuthGuard)
@Controller('suscription')
export class SuscriptionController {
  constructor(private service: SuscriptionService) {}

  @Post('new')
  async create(@Body() suscription: SuscriptionDTO, @Request() req: LoggedRequest) {
    return this.service.create(req.user, suscription);
  }

  @Post('validate')
  async validate(@Body() notificationMercadoPago: NotificationMercadoPagoDTO) {
    return this.service.updateSuscriptionInformation(notificationMercadoPago.data.id);
  }

  @Get(':uuid')
  async findById(@Param('uuid') id: string) {
    return this.service.findById(id);
  }
}
