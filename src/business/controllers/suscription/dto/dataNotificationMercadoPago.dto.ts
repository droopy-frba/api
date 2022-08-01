import { IsString } from 'class-validator';

export class DataNotificationMercadoPagoDTO {
  @IsString()
  id: string;
}
