import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { EPaymentStatus } from '@/enums/payment.enums';
import { ESuscriptionStatus } from '@/enums/suscription.enums';
import { MercadoPagoResponse, getPayment, sendPayment } from '@/helpers/mercadopago.helpers';

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
      status: ESuscriptionStatus.INACTIVE,
      payment,
    });

    await this.suscriptionRepository.save(suscription);

    return {
      suscriptionUuid: suscription.uuid,
      URL: response.redirectURL,
    };
  }

  async validateCheckout(suscriptionUuid: string) {
    const suscription: SuscriptionEntity = await this.suscriptionRepository.findById(suscriptionUuid);

    if (!suscription) {
      throw new BadRequestException('The suscription does not exist.');
    }

    if (suscription.payment.status !== EPaymentStatus.PENDING) {
      throw new BadRequestException('The suscription payment has been already validated.');
    }

    const response: MercadoPagoResponse = await getPayment(suscription.payment.externalPaymentId);

    if (response.status.toUpperCase() === 'AUTHORIZED') {
      suscription.lastPaid = new Date(Date.now());
      suscription.status = ESuscriptionStatus.ACTIVE;
      suscription.payment.status = EPaymentStatus.ACCEPTED;
    } else {
      suscription.payment.status = EPaymentStatus.REJECTED;
    }

    const suscriptionSaved = await this.suscriptionRepository.save(suscription);

    return suscriptionSaved;
  }

  async findById(uuid: string) {
    return this.suscriptionRepository.findById(uuid);
  }
}
