import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '@/business/repositories/base.entity';

import { FilmSearchEntity } from '../filmSearch/filmSearch.entity';
import { FilmmakerEntity } from '../filmmaker/filmmaker.entity';

@Entity({ name: 'filmmaker_review' })
export class FilmmakerReviewEntity extends BaseEntity {
  @Column()
  comment: string;

  @Column()
  review: number;

  @ManyToOne(() => FilmmakerEntity)
  filmmaker: FilmmakerEntity;

  @ManyToOne(() => FilmSearchEntity)
  filmSearch: FilmSearchEntity;
}
