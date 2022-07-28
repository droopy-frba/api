import { IsString } from 'class-validator';

export class SuscriptionValidationDTO {
  @IsString()
  suscriptionUuid: string;
}
