import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';

import { BaseEntity } from '@/business/base.entity';
import { ConsumerEntity } from '@/business/consumer/consumer.entity';
import { FilmPostulationEntity } from '@/business/filmPostulation/filmPostulation.entity';
import { UserEntity } from '@/business/user/user.entity';
import { EFilmSearchStatus } from '@/enums/filmSearch.enums';

import { Location } from './location';

@Entity({ name: 'film_search' })
export class FilmSearchEntity extends BaseEntity {
  @ManyToOne(() => ConsumerEntity)
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

  @OneToOne(() => UserEntity)
  user: UserEntity;

  @Column({ type: 'timestamp' })
  expirationDate: Date;

  acceptedPostulation?: FilmPostulationEntity;
}
