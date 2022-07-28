import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductEntity } from '@/business/repositories/product/product.entity';
import { ProductRepository } from '@/business/repositories/product/product.repository';
import { ProductService } from '@/business/services/product.service';

import { ProductController } from '../controllers/product/product.controller';

@Module({
  controllers: [ProductController],
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [ProductService, ProductRepository],
  exports: [TypeOrmModule, ProductService, ProductRepository],
})
export class ProductModule {}
