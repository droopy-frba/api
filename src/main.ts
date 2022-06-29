import { NestFactory } from '@nestjs/core';

import { CONFIG } from '@/configs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix(CONFIG.nest.prefix);
  await app.listen(CONFIG.nest.port);
}
bootstrap();
