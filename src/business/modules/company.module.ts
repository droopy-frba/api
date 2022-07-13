import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyController } from '@/business/controllers/company/company.controller';
import { CompanyEntity } from '@/business/repositories/company/company.entity';
import { CompanyRepository } from '@/business/repositories/company/company.repository';
import { CompanyService } from '@/business/services/company.service';

@Module({
  controllers: [CompanyController],
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  providers: [CompanyService, CompanyRepository],
  exports: [TypeOrmModule, CompanyRepository],
})
export class CompanyModule {}
