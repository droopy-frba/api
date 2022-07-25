import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { FilmSearchRepository } from '@/business/repositories/filmSearch/filmSearch.repository';
import { EFilmSearchStatus } from '@/enums/filmSearch.enums';

import FilmSearchDTO from '../controllers/filmSearch/dto/filmsearch.dto';
import UpdateFilmSearchDTO from '../controllers/filmSearch/dto/updateFilmSearch.dto';
import { ConsumerEntity } from '../repositories/consumer/consumer.entity';
import { ConsumerRepository } from '../repositories/consumer/consumer.repository';
import { FilmPostulationRepository } from '../repositories/filmPostulation/filmPostulation.repository';
import { FilmSearchEntity } from '../repositories/filmSearch/filmSearch.entity';
import { SuscriptionRepository } from '../repositories/suscription/suscription.repository';
import { UserEntity } from '../repositories/user/user.entity';

@Injectable()
export class FilmSearchService {
  constructor(
    @Inject(FilmSearchRepository)
    private readonly filmSearchRepository: FilmSearchRepository,
    @Inject(ConsumerRepository)
    private readonly consumerRepository: ConsumerRepository,
    @Inject(SuscriptionRepository)
    private readonly subscriptionRepository: SuscriptionRepository,
    @Inject(FilmPostulationRepository)
    private readonly filmPostulationRepository: FilmPostulationRepository,
  ) {}

  async create(user: UserEntity, body: FilmSearchDTO) {
    const consumer = await this.consumerRepository.findByUser(user);
    if (!consumer) {
      throw new BadRequestException('Invalid Consumer');
    }
    await this.validateActiveSubscription(consumer);
    const filmSearch = plainToClass(FilmSearchEntity, {
      location: body.location,
      title: body.title,
      status: EFilmSearchStatus.PENDING,
      description: body.description,
      expirationDate: this.calculateExpirationDate(body.timeToExpiration),
      consumer,
    });
    return this.filmSearchRepository.save(filmSearch);
  }

  async findClosests(latitude: number, longitude: number, maxDistance: number) {
    return this.filmSearchRepository.findClosests(latitude, longitude, maxDistance);
  }

  async findPostulations(uuid: string, limit: number, offset: number) {
    return this.filmPostulationRepository.findByFilmSearch(uuid, limit, offset);
  }

  async update(uuid: string, body: UpdateFilmSearchDTO) {
    return this.filmSearchRepository.update(uuid, body);
  }

  async findByUuid(uuid: string) {
    return this.filmSearchRepository.findOne(uuid);
  }

  async delete(uuid: string) {
    return this.filmSearchRepository.delete(uuid);
  }

  calculateExpirationDate(minutesToExpiration: number) {
    return new Date(new Date().getTime() + minutesToExpiration * 60000);
  }

  async validateActiveSubscription(consumer: ConsumerEntity) {
    const subscription = await this.subscriptionRepository.findByCompany(consumer.company);
    if (subscription === undefined || !subscription.isActive) {
      throw new BadRequestException('User does not have an active subscription');
    }
  }
}
