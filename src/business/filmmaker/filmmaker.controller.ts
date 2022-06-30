import { Controller } from '@nestjs/common';

import { FilmmakerService } from './filmmaker.service';

@Controller('filmmaker')
export class FilmmakerController {
  constructor(private service: FilmmakerService) {}
}
