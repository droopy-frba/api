import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { BaseEntity } from '@/business/repositories/base.entity';
import { UserEntity } from '@/business/repositories/user/user.entity';

import { CompanyEntity } from '../company/company.entity';

@Entity({ name: 'consumer' })
export class ConsumerEntity extends BaseEntity {
  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => CompanyEntity, { cascade: true })
  company: CompanyEntity;
}
