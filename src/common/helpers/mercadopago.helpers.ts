import { ConflictException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import mercadopago from 'mercadopago';
// eslint-disable-next-line import/no-unresolved
import { Currency } from 'mercadopago/shared/currency';

export class MercadoPagoResponse {
  id: string;

  collectorId: string;

  redirectURL: string;

  payerId: string;
}
export function sendPayment(amount: number, email: string): MercadoPagoResponse {
  const transaction = {
    reason: 'Suscripcion de Droopy',
    payer_email: email,
    auto_recurring: {
      frequency: 1,
      frequency_type: 'months' as 'months' | 'days',
      transaction_amount: amount,
      currency_id: 'ARS' as Currency,
    },
    back_url: 'https://www.droopy.com/confirmation',
  };

  mercadopago.configurations.setAccessToken(
    'Bearer TEST-4721290888328770-072316-e46fcf6f6c46814d105354413003e194-167954877',
  );
  mercadopago.preapproval
    .create(transaction)
    .then(function (response) {
      return plainToClass(MercadoPagoResponse, {
        id: response.body.id,
        collectorId: response.body.collector_id,
        redirectURL: response.body.init_point,
        payerId: response.body.payer_id,
      });
    })
    .catch(function (error) {
      throw new ConflictException('Payment process has failed.', error);
    });
  return null;
}
