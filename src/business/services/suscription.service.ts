import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { getManager } from 'typeorm';

import { EPaymentStatus } from '@/enums/payment.enums';
import { ESuscriptionStatus } from '@/enums/suscription.enums';
import { MercadoPagoResponse, sendPayment } from '@/helpers/mercadopago.helpers';

import { SuscriptionDTO } from '../controllers/suscription/dto/suscription.dto';
import { ConsumerEntity } from '../repositories/consumer/consumer.entity';
import { ConsumerRepository } from '../repositories/consumer/consumer.repository';
import { PaymentEntity } from '../repositories/payment/payment.entity';
import { PaymentRepository } from '../repositories/payment/payment.repository';
import { ProductEntity } from '../repositories/product/product.entity';
import { ProductRepository } from '../repositories/product/product.repository';
import { SuscriptionEntity } from '../repositories/suscription/suscription.entity';
import { SuscriptionRepository } from '../repositories/suscription/suscription.repository';
import { UserEntity } from '../repositories/user/user.entity';

@Injectable()
export class SuscriptionService {
  constructor(
    @Inject(SuscriptionRepository)
    private suscriptionRepository: SuscriptionRepository,
    @Inject(ConsumerRepository)
    private readonly consumerRepository: ConsumerRepository,
    @Inject(PaymentRepository)
    private paymentRepository: PaymentRepository,
    @Inject(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async create(user: UserEntity, suscriptionData: SuscriptionDTO) {
    const consumer: ConsumerEntity = await this.consumerRepository.findByUser(user);
    const product: ProductEntity = await this.productRepository.findByID(suscriptionData.product);
    const amount = suscriptionData.hours * product.price;

    if (consumer && product) {
      const suscription: SuscriptionEntity = plainToClass(SuscriptionEntity, {
        product,
        hours: suscriptionData.hours,
        availableHours: suscriptionData.hours,
        company: consumer.company,
        lastPaid: null,
        status: ESuscriptionStatus.ACTIVE,
      });
      const response: MercadoPagoResponse = sendPayment(suscriptionData.cardId, amount, user.email);

      const payment: PaymentEntity = plainToClass(PaymentEntity, {
        externalPaymentId: response.id,
        status: EPaymentStatus.PENDING,
        value: amount,
        cardId: suscriptionData.cardId,
        payerId: response.payerId,
        collectorId: response.collectorId,
        paymentMethodId: response.paymentMethodId,
        suscription,
      });
      await getManager().transaction(async (transactionalEntityManager) => {
        await this.suscriptionRepository.save(suscription, transactionalEntityManager);
        await this.paymentRepository.save(payment, transactionalEntityManager);
      });
      return {
        URL: response.redirectURL,
      };
    }
    return null;
  }

  async findById(id: string) {
    return this.suscriptionRepository.findById(id);
  }
}
