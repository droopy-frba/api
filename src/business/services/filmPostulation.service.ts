import { Injectable } from '@nestjs/common';

import { FilmPostulationRepository } from '@/business/repositories/filmPostulation/filmPostulation.repository';

@Injectable()
export class FilmPostulationService {
  constructor(private repository: FilmPostulationRepository) {}
}
