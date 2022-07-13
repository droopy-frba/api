import { Injectable } from '@nestjs/common';

import { CompanyRepository } from '@/business/repositories/company/company.repository';

@Injectable()
export class CompanyService {
  constructor(private repository: CompanyRepository) {}
}
