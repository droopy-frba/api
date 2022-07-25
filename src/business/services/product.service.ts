import { Injectable } from '@nestjs/common';

import { ProductRepository } from '@/business/repositories/product/product.repository';

@Injectable()
export class ProductService {
  constructor(private repository: ProductRepository) {}
}
