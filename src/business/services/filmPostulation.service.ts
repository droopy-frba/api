import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { FilmPostulationRepository } from '@/business/repositories/filmPostulation/filmPostulation.repository';
import { EFilmPostulationStatus } from '@/enums/filmPostulation.enums';
import { createAgoraUserToken } from '@/services/agora.services';

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

  async createVideoConnection(uuid: string, user: UserEntity) {
    const filmPostulation = await this.validatePostulation(uuid, user);
    if (filmPostulation.status !== EFilmPostulationStatus.ACCEPTED) {
      throw new BadRequestException('Postulation must be in accepted status');
    }
    const expiration = Math.floor(Date.now() / 1000) + 60 * 60;
    const isConsumer = filmPostulation.filmSearch.consumer?.user.uuid === user.uuid;
    console.log(isConsumer);
    const token = createAgoraUserToken(uuid, user.uuid, expiration, isConsumer);
    return { token };
  }

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
    await this.validatePostulation(uuid, user);
    await this.repository.update(uuid, body);
  }

  async findByUuid(uuid: string) {
    return this.repository.findByUuid(uuid);
  }

  private async validatePostulation(uuid: string, user: UserEntity) {
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
    return filmPostulation;
  }
}
