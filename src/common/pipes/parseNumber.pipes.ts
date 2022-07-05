import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseNumberPipe implements PipeTransform<unknown, number> {
  transform(value: string): number {
    if (Number.isNaN(Number(value))) {
      throw new BadRequestException('Invalid number parameter');
    }
    return Number(value);
  }
}
