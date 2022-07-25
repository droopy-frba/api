import { AfterLoad, Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '@/business/repositories/base.entity';
import { ESuscriptionStatus } from '@/enums/suscription.enums';

import { CompanyEntity } from '../company/company.entity';
import { ProductEntity } from '../product/product.entity';

@Entity({ name: 'suscription' })
export class SuscriptionEntity extends BaseEntity {
  @ManyToOne(() => ProductEntity)
  product: ProductEntity;

  @Column()
  hours: number;

  @Column({ name: 'available_hours' })
  availableHours: number;

  @ManyToOne(() => CompanyEntity)
  company: CompanyEntity;

  @Column()
  status: ESuscriptionStatus;

  @Column({ name: 'last_paid' })
  lastPaid: Date;

  isActive: boolean;

  @AfterLoad()
  determineIsActive() {
    this.isActive = this.status === ESuscriptionStatus.ACTIVE && this.availableHours > 0;
  }
}
