import { BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
// eslint-disable-next-line import/no-unresolved
import { Currency } from 'mercadopago/shared/currency';

import mercadopago = require('mercadopago');

export class MercadoPagoResponse {
  id: string;

  collectorId: string;

  redirectURL: string;

  payerId: string;

  status: string;
}
export async function sendPayment(amount: number, email: string): Promise<MercadoPagoResponse> {
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

  mercadopago.configure({
    access_token: 'TEST-4721290888328770-072316-e46fcf6f6c46814d105354413003e194-167954877',
  });

  const result = mercadopago.preapproval
    .create(transaction)
    .then((response) => {
      return plainToClass(MercadoPagoResponse, {
        id: response.body.id,
        collectorId: response.body.collector_id,
        redirectURL: response.body.init_point,
        payerId: response.body.payer_id,
        status: response.body.status,
      });
    })
    .catch(() => {
      throw new BadRequestException('Payment process has failed.');
    });
  return result;
}

export async function getPayment(mercadopagoPaymentId: string): Promise<MercadoPagoResponse> {
  mercadopago.configure({
    access_token: 'TEST-4721290888328770-072316-e46fcf6f6c46814d105354413003e194-167954877',
  });

  const result = mercadopago.preapproval
    .findById(mercadopagoPaymentId)
    .then((response) => {
      return plainToClass(MercadoPagoResponse, {
        id: response.body.id,
        collectorId: response.body.collector_id,
        redirectURL: response.body.init_point,
        payerId: response.body.payer_id,
        status: response.body.status,
      });
    })
    .catch(() => {
      throw new BadRequestException('Retrieving payment has failed.');
    });
  return result;
}
