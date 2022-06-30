import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FilmPostulationEntity } from './filmPostulation.entity';

@Injectable()
export class FilmPostulationService {
  constructor(
    @InjectRepository(FilmPostulationEntity)
    private repository: Repository<FilmPostulationEntity>,
  ) {}
}
