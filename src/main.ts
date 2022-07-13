import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { CONFIG } from '@/configs/config';
import { GlobalExceptionFilter } from '@/filters/globalException.filters';
import { HttpExceptionFilter } from '@/filters/httpException.filters';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix(CONFIG.nest.prefix);
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(CONFIG.nest.port);
}

bootstrap();
