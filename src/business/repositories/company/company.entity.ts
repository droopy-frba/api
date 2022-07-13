import { Column, Entity } from 'typeorm';

import { BaseEntity } from '@/business/repositories/base.entity';

@Entity({ name: 'company' })
export class CompanyEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  identifier: string;
}
