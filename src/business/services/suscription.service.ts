import { Injectable } from '@nestjs/common';

import { SuscriptionRepository } from '../repositories/suscription/suscription.repository';

@Injectable()
export class SuscriptionService {
  constructor(private repository: SuscriptionRepository) {}
}
