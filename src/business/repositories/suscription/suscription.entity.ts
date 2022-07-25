import { AfterLoad, Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '@/business/repositories/base.entity';
import { ESuscriptionStatus } from '@/enums/suscription.enums';

import { CompanyEntity } from '../company/company.entity';

@Entity({ name: 'suscription' })
export class SuscriptionEntity extends BaseEntity {
  @Column()
  hours: number;

  @Column({ name: 'available_hours' })
  availableHours: number;

  @Column()
  status: ESuscriptionStatus;

  @ManyToOne(() => CompanyEntity)
  company: CompanyEntity;

  isActive: boolean;

  @AfterLoad()
  determineIsActive() {
    this.isActive = this.status === ESuscriptionStatus.ACTIVE && this.availableHours > 0;
  }
}
