import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '@/business/repositories/base.entity';
import { UserEntity } from '@/business/repositories/user/user.entity';

import { FilmPostulationEntity } from '../filmPostulation/filmPostulation.entity';

@Entity({ name: 'chat_message' })
export class ChatMessageEntity extends BaseEntity {
  @ManyToOne(() => FilmPostulationEntity)
  filmPostulation: FilmPostulationEntity;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column()
  message: string;
}
