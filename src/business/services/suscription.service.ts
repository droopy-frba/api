import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { EPaymentStatus } from '@/enums/payment.enums';
import { ESuscriptionStatus } from '@/enums/suscription.enums';
import { MercadoPagoResponse, getPayment, sendPayment } from '@/services/mercadopago.services';

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

    if (!consumer) {
      throw new BadRequestException('The consumer does not exist.');
    }
    if (!product) {
      throw new BadRequestException('The product does not exist.');
    }

    const response: MercadoPagoResponse = await sendPayment(amount, user.email);

    const payment: PaymentEntity = plainToClass(PaymentEntity, {
      externalPaymentId: response.id,
      status: EPaymentStatus.PENDING,
      value: amount,
      payerId: response.payerId,
      collectorId: response.collectorId,
    });

    const suscription: SuscriptionEntity = plainToClass(SuscriptionEntity, {
      product,
      hours: suscriptionData.hours,
      availableHours: suscriptionData.hours,
      company: consumer.company,
      lastPaid: null,
      status: ESuscriptionStatus.PENDING,
      payment,
    });

    await this.suscriptionRepository.save(suscription);

    return {
      suscriptionUuid: suscription.uuid,
      URL: response.redirectURL,
    };
  }

  async updateSuscriptionInformation(externalPaymentId: string) {
    const payment: PaymentEntity = await this.paymentRepository.findByExternalPaymentId(externalPaymentId);

    if (!payment) {
      throw new BadRequestException('The suscription does not exist.');
    }

    const suscription: SuscriptionEntity = await this.suscriptionRepository.findByPayment(payment);

    const response: MercadoPagoResponse = await getPayment(externalPaymentId);

    suscription.status = ESuscriptionStatus[response.status.toUpperCase()];

    suscription.payment.status =
      !response.semaphore || response.semaphore === 'green' ? EPaymentStatus.ACCEPTED : EPaymentStatus.REJECTED;

    suscription.lastPaid = response.last_paid;

    const suscriptionSaved = await this.suscriptionRepository.save(suscription);

    return suscriptionSaved;
  }

  async findById(uuid: string) {
    return this.suscriptionRepository.findById(uuid);
  }
}
