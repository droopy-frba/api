import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '@/business/repositories/base.entity';
import { EFilmPostulationStatus } from '@/enums/filmPostulation.enums';

import { FilmSearchEntity } from '../filmSearch/filmSearch.entity';
import { FilmmakerEntity } from '../filmmaker/filmmaker.entity';

@Entity({ name: 'film_postulation' })
export class FilmPostulationEntity extends BaseEntity {
  @ManyToOne(() => FilmmakerEntity)
  filmmaker: FilmmakerEntity;

  @ManyToOne(() => FilmSearchEntity)
  filmSearch: FilmSearchEntity;

  @Column({ default: EFilmPostulationStatus.NEW })
  status: EFilmPostulationStatus;

  // TODO: check how this integrates with agora
  @Column()
  stream: string;

  @Column()
  chat: string;
}
