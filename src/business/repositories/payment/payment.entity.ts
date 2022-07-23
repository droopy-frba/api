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

  @Column({ name: 'card_id' })
  cardId: string;

  @Column({ name: 'payer_id' })
  payerId: string;

  @Column({ name: 'collector_id' })
  collectorId: string;

  @Column({ name: 'payment_method_id' })
  paymentMethodId: string;

  @ManyToOne(() => SuscriptionEntity)
  suscription: SuscriptionEntity;
}
