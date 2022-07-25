import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { FilmPostulationRepository } from '@/business/repositories/filmPostulation/filmPostulation.repository';

import { UpdateFilmPostulationDTO } from '../controllers/filmPostulation/dto/updateFilmPostulationDTO.dto';
import { FilmPostulationEntity } from '../repositories/filmPostulation/filmPostulation.entity';
import { FilmSearchRepository } from '../repositories/filmSearch/filmSearch.repository';
import { FilmmakerRepository } from '../repositories/filmmaker/filmmaker.repository';
import { UserEntity } from '../repositories/user/user.entity';

@Injectable()
export class FilmPostulationService {
  constructor(
    private repository: FilmPostulationRepository,
    private filmSearchRepository: FilmSearchRepository,
    private filmmakerRepository: FilmmakerRepository,
  ) {}

  async create(user: UserEntity, filmSearchUuid: string) {
    const filmSearch = await this.filmSearchRepository.findOne(filmSearchUuid);
    if (!filmSearch) {
      throw new BadRequestException('Invalid film search');
    }

    const filmmaker = await this.filmmakerRepository.findByUser(user);
    if (!filmmaker) {
      throw new BadRequestException('Filmmaker Not found');
    }

    const filmPostulation = await this.repository.findBySearchAndFilmmaker(filmSearch.uuid, filmmaker.uuid);
    if (filmPostulation) {
      throw new BadRequestException('Already made a postulation for this film search');
    }
    return this.repository.save(plainToClass(FilmPostulationEntity, { filmSearch, filmmaker }));
  }

  async update(uuid: string, user: UserEntity, body: UpdateFilmPostulationDTO) {
    const filmPostulation = await this.repository.findByUuid(uuid);
    if (!filmPostulation) {
      throw new BadRequestException('Invalid film postulation');
    }
    if (
      filmPostulation.filmmaker?.user.uuid !== user.uuid &&
      filmPostulation.filmSearch.consumer?.user.uuid !== user.uuid
    ) {
      // eslint-disable-next-line quotes
      throw new BadRequestException('You cannot update this film postulation');
    }
    await this.repository.update(uuid, body);
  }

  async findByUuid(uuid: string) {
    return this.repository.findByUuid(uuid);
  }
}
