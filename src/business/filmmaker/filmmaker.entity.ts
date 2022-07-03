import { Column, Entity, OneToOne } from 'typeorm';

import { BaseEntity } from '@/business/base.entity';
import { UserEntity } from '@/business/user/user.entity';

@Entity({ name: 'filmmaker' })
export class FilmmakerEntity extends BaseEntity {
  @Column({ name: 'phone_brand' })
  phoneBrand: string;

  @Column({ name: 'phone_model' })
  phoneModel: string;

  @Column()
  review: number;

  @OneToOne(() => UserEntity)
  user: UserEntity;
}
