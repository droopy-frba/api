import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { FilmSearchRepository } from '@/business/repositories/filmSearch/filmSearch.repository';
import { EFilmSearchStatus } from '@/enums/filmSearch.enums';

import FilmSearchDTO from '../controllers/filmSearch/dto/filmsearch.dto';
import FindClosestFilmSearchDto from '../controllers/filmSearch/dto/findClosestFilmSearch.dto';
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
    if (!(await this.consumerHasActiveSubscription(body.consumerUuid))) {
      throw new BadRequestException('User does not have an active subscription');
    }

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

  async findClosestsTo(body: FindClosestFilmSearchDto) {
    return this.filmSearchRepository.findClosestsTo(body);
  }

  async update(uuid: string, body: UpdateFilmSearchDTO) {
    const filmSearch = await this.findByUuid(uuid);
    const updatedFilmSearch = await this.updateFilmSearchFields(filmSearch, body, uuid);
    return this.filmSearchRepository.save(updatedFilmSearch);
  }

  async findByUuid(uuid: string) {
    if (uuid === undefined) {
      throw new BadRequestException('uuid is required');
    }
    const filmSearch = await this.filmSearchRepository.findOne(uuid);
    if (filmSearch === undefined) {
      throw new BadRequestException('Film search not found');
    }
    return filmSearch;
  }

  async calculateExpirationDate(minutesToExpiration: number) {
    return new Date(new Date().getTime() + minutesToExpiration * 60000);
  }

  async consumerHasActiveSubscription(consumerUuid: string) {
    const subscription = await this.getSubscriptionFromConsumerUuid(consumerUuid);
    return subscription !== undefined && subscription.isActive();
  }

  async getSubscriptionFromConsumerUuid(consumerUuid: string) {
    const consumer = await this.consumerRepository.findOne(consumerUuid);
    return this.subscriptionRepository.findByCompany(consumer.company);
  }

  async updateFilmSearchFields(filmSearch: FilmSearchEntity, body: UpdateFilmSearchDTO, uuid: string) {
    return plainToClass(FilmSearchEntity, {
      uuid,
      location: body.location || filmSearch.location,
      title: body.title || filmSearch.title,
      status: EFilmSearchStatus.PENDING || filmSearch.status,
      description: body.description || filmSearch.description,
      expirationDate: (await this.calculateExpirationDate(body.timeToExpiration)) || filmSearch.expirationDate,
      consumer: (await this.consumerRepository.findOne(body.consumerUuid)) || filmSearch.consumer,
      review: body.review || filmSearch.review,
    });
  }
}
