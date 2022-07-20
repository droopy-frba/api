import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { FilmSearchRepository } from '@/business/repositories/filmSearch/filmSearch.repository';
import { EFilmSearchStatus } from '@/enums/filmSearch.enums';
import { ESuscriptionStatus } from '@/enums/suscription.enums';

import FilmSearchDTO from '../controllers/filmSearch/dto/filmsearch.dto';
import FindClosestFilmSearchDto from '../controllers/filmSearch/dto/findClosestFilmSearch.dto';
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

  async createFilmSearch(body: FilmSearchDTO) {
    if (!(await this.consumerHasActiveSubscription(body.consumerUuid))) {
      throw new BadRequestException('User does not have an active subscription');
    }

    const filmSearch = plainToClass(FilmSearchEntity, {
      location: body.location,
      title: body.title,
      status: EFilmSearchStatus.PENDING,
      description: body.description,
      expirationDate: this.calculateExpirationTimestamp(body.expirationTime),
      consumer: body.consumerUuid,
    });
    console.log(filmSearch);
    return this.filmSearchRepository.save(filmSearch);
  }

  async findClosestsTo(body: FindClosestFilmSearchDto) {
    return this.filmSearchRepository.findClosestsTo(body);
  }

  async calculateExpirationTimestamp(minutesToExpiration: number) {
    return new Date().getTime() + minutesToExpiration * 60000;
  }

  async consumerHasActiveSubscription(consumerUuid: string) {
    const subscription = await this.getSubscriptionFromConsumerUuid(consumerUuid);
    return (
      subscription !== undefined && subscription.status === ESuscriptionStatus.ACTIVE && subscription.availableHours > 0
    );
  }

  async getSubscriptionFromConsumerUuid(consumerUuid: string) {
    const consumer = await this.consumerRepository.findOne(consumerUuid);
    return this.subscriptionRepository.findByCompany(consumer.company);
  }
}
