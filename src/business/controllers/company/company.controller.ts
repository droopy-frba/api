import { Controller } from '@nestjs/common';

import { CompanyService } from '@/business/services/company.service';

@Controller('company')
export class CompanyController {
  constructor(private service: CompanyService) {}
}
