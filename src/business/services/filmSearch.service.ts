import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { FilmSearchRepository } from '@/business/repositories/filmSearch/filmSearch.repository';
import { EFilmSearchStatus } from '@/enums/filmSearch.enums';

import FilmSearchDTO from '../controllers/filmSearch/dto/filmsearch.dto';
import UpdateFilmSearchDTO from '../controllers/filmSearch/dto/updateFilmSearch.dto';
import { ConsumerRepository } from '../repositories/consumer/consumer.repository';
import { FilmSearchEntity } from '../repositories/filmSearch/filmSearch.entity';
import { SuscriptionRepository } from '../repositories/suscription/suscription.repository';

@Injectable()
export class FilmSearchService {
  constructor(
    @Inject(FilmSearchRepository)
    private readonly filmSearchRepository: FilmSearchRepository,
    @Inject(ConsumerRepository)
    private readonly consumerRepository: ConsumerRepository,
    @Inject(SuscriptionRepository)
    private readonly subscriptionRepository: SuscriptionRepository,
  ) {}

  async create(body: FilmSearchDTO) {
    await this.validateActiveSubscription(body.consumerUuid);
    const filmSearch = plainToClass(FilmSearchEntity, {
      location: body.location,
      title: body.title,
      status: EFilmSearchStatus.PENDING,
      description: body.description,
      expirationDate: this.calculateExpirationDate(body.timeToExpiration),
      consumer: body.consumerUuid,
    });
    return this.filmSearchRepository.save(filmSearch);
  }

  async findClosests(latitude: number, longitude: number, maxDistance: number) {
    return this.filmSearchRepository.findClosests(latitude, longitude, maxDistance);
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

  async validateActiveSubscription(consumerUuid: string) {
    const subscription = await this.getSubscriptionFromConsumerUuid(consumerUuid);
    if (subscription === undefined || !subscription.isActive) {
      throw new BadRequestException('User does not have an active subscription');
    }
  }

  async getSubscriptionFromConsumerUuid(consumerUuid: string) {
    const consumer = await this.consumerRepository.findOne(consumerUuid);
    return this.subscriptionRepository.findByCompany(consumer.company);
  }
}
