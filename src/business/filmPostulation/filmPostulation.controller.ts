import { Controller } from '@nestjs/common';

import { FilmPostulationService } from './filmPostulation.service';

@Controller('film_postulation')
export class FilmPostulationController {
  constructor(private service: FilmPostulationService) {}
}
