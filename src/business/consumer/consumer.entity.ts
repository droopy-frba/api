import { Entity, ManyToOne, OneToOne } from 'typeorm';

import { BaseEntity } from '@/business/base.entity';
import { UserEntity } from '@/business/user/user.entity';

import { CompanyEntity } from '../company/company.entity';

@Entity({ name: 'consumer' })
export class ConsumerEntity extends BaseEntity {
  @OneToOne(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => CompanyEntity)
  company: CompanyEntity;
}
