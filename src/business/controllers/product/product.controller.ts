import { Controller, Get, UseGuards } from '@nestjs/common';

import { ProductService } from '@/business/services/product.service';
import { JwtAuthGuard } from '@/guards/jwtAuth.guards';

@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
  constructor(private service: ProductService) {}

  @Get('')
  async findAll() {
    return this.service.findAll();
  }
}
