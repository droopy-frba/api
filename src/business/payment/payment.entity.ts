import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '@/business/base.entity';
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

  @ManyToOne(() => SuscriptionEntity)
  suscription: SuscriptionEntity;
}
