import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '@/business/repositories/base.entity';
import { ConsumerEntity } from '@/business/repositories/consumer/consumer.entity';
import { FilmPostulationEntity } from '@/business/repositories/filmPostulation/filmPostulation.entity';
import { EFilmSearchStatus } from '@/enums/filmSearch.enums';

import { Location } from './location';

@Entity({ name: 'film_search' })
export class FilmSearchEntity extends BaseEntity {
  @ManyToOne(() => ConsumerEntity, { eager: true })
  consumer: ConsumerEntity;

  @Column(() => Location)
  location: Location;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: EFilmSearchStatus;

  @Column({ name: 'phone_model' })
  phoneModel: string;

  @Column()
  review: number;

  @Column({ type: 'timestamp' })
  expirationDate: Date;

  acceptedPostulation?: FilmPostulationEntity;
}
