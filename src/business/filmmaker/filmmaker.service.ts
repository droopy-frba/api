import { Injectable } from '@nestjs/common';

import { FilmmakerRepository } from './filmmaker.repository';

@Injectable()
export class FilmmakerService {
  constructor(private repository: FilmmakerRepository) {}
}
