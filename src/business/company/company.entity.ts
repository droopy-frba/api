import { Column, Entity } from 'typeorm';

import { BaseEntity } from '@/business/base.entity';

@Entity({ name: 'consumer' })
export class CompanyEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  identifier: string;
}
