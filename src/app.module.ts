import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DB_CONFIG } from '@/configs/db';

@Module({
  imports: [TypeOrmModule.forRoot(DB_CONFIG)],
})
export class AppModule {}
