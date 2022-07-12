import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { CompanyRepository } from '@/business/company/company.repository';
import { ConsumerModule } from '@/business/consumer/consumer.module';
import { ConsumerRepository } from '@/business/consumer/consumer.repository';
import { FilmmakerModule } from '@/business/filmmaker/filmmaker.module';
import { FilmmakerRepository } from '@/business/filmmaker/filmmaker.repository';
import { UserModule } from '@/business/user/user.module';
import { UserRepository } from '@/business/user/user.repository';
import { CONFIG } from '@/configs/config';

import { CompanyModule } from '../company/company.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    FilmmakerModule,
    ConsumerModule,
    CompanyModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: CONFIG.jwt.secretKey,
        signOptions: {
          expiresIn: CONFIG.jwt.expiresIn,
        },
      }),
    }),
  ],
  providers: [
    AuthService,
    UserRepository,
    CompanyRepository,
    FilmmakerRepository,
    ConsumerRepository,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
