import { Column, Entity } from 'typeorm';

import { BaseEntity } from '@/business/repositories/base.entity';

@Entity({ name: 'product' })
export class ProductEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  info: string;
}
