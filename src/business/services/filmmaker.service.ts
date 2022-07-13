import { Injectable } from '@nestjs/common';

import { FilmmakerRepository } from '@/business/repositories/filmmaker/filmmaker.repository';

@Injectable()
export class FilmmakerService {
  constructor(private repository: FilmmakerRepository) {}
}
