import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity } from '@/business/repositories/base.entity';
import { UserEntity } from '@/business/repositories/user/user.entity';

@Entity({ name: 'filmmaker' })
export class FilmmakerEntity extends BaseEntity {
  @Column({ name: 'phone_brand' })
  phoneBrand: string;

  @Column({ name: 'phone_model' })
  phoneModel: string;

  @Column()
  review: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
