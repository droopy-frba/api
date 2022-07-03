import { Controller } from '@nestjs/common';

import { SuscriptionService } from './suscription.service';

@Controller('suscription')
export class SuscriptionController {
  constructor(private service: SuscriptionService) {}
}
