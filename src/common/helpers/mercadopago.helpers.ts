import { ConflictException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import mercadopago from 'mercadopago';

export class MercadoPagoResponse {
  id: string;

  collectorId: string;

  redirectURL: string;

  payerId: string;

  paymentMethodId: string;

  nextPaymentDate: string;
}
export function sendPayment(cardId: string, amount: number, email: string): MercadoPagoResponse {
  const transaction = {
    reason: 'Suscripcion de Droopy',
    payer: email,
    card_token_id: cardId,
    payment_method_id: cardId,
    auto_recurring: {
      frequency: 1,
      frequency_type: 'months',
      start_date: Date.now(),
      currency_id: 'ARS',
    },
    transaction_amount: amount,
    installments: null,
    back_url: 'https://www.droopy.com/confirmation',
    status: 'authorized',
  };
  mercadopago.payment
    .save(transaction as any)
    .then(function (response) {
      return plainToClass(MercadoPagoResponse, {
        id: response.body.id,
        collectorId: response.body.collector_id,
        redirectURL: response.body.init_point,
        payerId: response.body.payer_id,
        paymentMethodId: response.body.payment_method_id,
        nextPaymentDate: response.body.next_payment_date,
      });
    })
    .catch(function (error) {
      throw new ConflictException('Payment process has failed.', error);
    });
  return null;
}
