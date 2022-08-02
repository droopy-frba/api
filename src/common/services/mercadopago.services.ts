import { BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
// eslint-disable-next-line import/no-unresolved
import { Currency } from 'mercadopago/shared/currency';

import { CONFIG } from '@/configs/config';

import mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: CONFIG.mercadopago.token,
});

export class MercadoPagoResponse {
  id: string;

  collectorId: string;

  redirectURL: string;

  payerId: string;

  status: string;

  semaphore?: string;

  last_paid?: Date;
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

  try {
    const response = await mercadopago.preapproval.create(transaction);
    return plainToClass(MercadoPagoResponse, {
      id: response.body.id,
      collectorId: response.body.collector_id,
      redirectURL: response.body.init_point,
      payerId: response.body.payer_id,
      status: response.body.status,
    });
  } catch {
    throw new BadRequestException('Payment process has failed.');
  }
}

export async function getPayment(mercadopagoPaymentId: string): Promise<MercadoPagoResponse> {
  try {
    const response = await mercadopago.preapproval.findById(mercadopagoPaymentId);
    return plainToClass(MercadoPagoResponse, {
      id: response.body.id,
      collectorId: response.body.collector_id,
      redirectURL: response.body.init_point,
      payerId: response.body.payer_id,
      status: response.body.status,
      semaphore: response.body.summarized.semaphore,
      last_paid: response.body.summarized.last_charged_date as Date,
    });
  } catch {
    throw new BadRequestException('Retrieving payment has failed.');
  }
}
