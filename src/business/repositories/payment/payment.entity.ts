import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '@/business/repositories/base.entity';
import { EPaymentStatus } from '@/enums/payment.enums';

import { SuscriptionEntity } from '../suscription/suscription.entity';

@Entity({ name: 'payment' })
export class PaymentEntity extends BaseEntity {
  @Column({ name: 'external_payment_id' })
  externalPaymentId: string;

  @Column()
  status: EPaymentStatus;

  @Column()
  value: number;

  @Column({ name: 'payer_id' })
  payerId: string;

  @Column({ name: 'collector_id' })
  collectorId: string;

  @ManyToOne(() => SuscriptionEntity)
  suscription: SuscriptionEntity;
}
