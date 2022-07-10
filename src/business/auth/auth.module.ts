import { Module } from '@nestjs/common';

import { ConsumerModule } from '@/business/consumer/consumer.module';
import { ConsumerRepository } from '@/business/consumer/consumer.repository';
import { FilmmakerModule } from '@/business/filmmaker/filmmaker.module';
import { FilmmakerRepository } from '@/business/filmmaker/filmmaker.repository';
import { UserModule } from '@/business/user/user.module';
import { UserRepository } from '@/business/user/user.repository';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [UserModule, FilmmakerModule, ConsumerModule],
  providers: [AuthService, UserRepository, FilmmakerRepository, ConsumerRepository],
})
export class AuthModule {}
