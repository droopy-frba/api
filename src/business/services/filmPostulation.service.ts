import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { FilmPostulationRepository } from '@/business/repositories/filmPostulation/filmPostulation.repository';

import { CreateFilmPostulationDTO } from '../controllers/filmPostulation/dto/createFilmPostulation.dto';
import { UpdateFilmPostulationDTO } from '../controllers/filmPostulation/dto/updateFilmPostulationDTO.dto';
import { FilmPostulationEntity } from '../repositories/filmPostulation/filmPostulation.entity';
import { FilmSearchRepository } from '../repositories/filmSearch/filmSearch.repository';
import { FilmmakerRepository } from '../repositories/filmmaker/filmmaker.repository';

@Injectable()
export class FilmPostulationService {
  constructor(
    private repository: FilmPostulationRepository,
    private filmSearchRepository: FilmSearchRepository,
    private filmmakerRepository: FilmmakerRepository,
  ) {}

  async create({ filmSearchUuid, filmmakerUuid }: CreateFilmPostulationDTO) {
    const filmSearch = await this.filmSearchRepository.findOne(filmSearchUuid);
    if (!filmSearch) {
      throw new BadRequestException('Invalid film search');
    }

    const filmmaker = await this.filmmakerRepository.findByUuid(filmmakerUuid);
    if (!filmSearch) {
      throw new BadRequestException('Invalid film search');
    }
    return this.repository.save(plainToClass(FilmPostulationEntity, { filmSearch, filmmaker }));
  }

  async update(uuid: string, body: UpdateFilmPostulationDTO) {
    await this.repository.update(uuid, body);
  }

  async findByFilmSearch(filmSearchUuid: string, page: number, size: number) {
    return this.repository.findByFilmSearch(filmSearchUuid, page, size);
  }

  async findByUuid(uuid: string) {
    return this.repository.findByUuid(uuid);
  }
}
