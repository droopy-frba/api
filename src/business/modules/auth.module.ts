import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from '@/business/controllers/auth/auth.controller';
import { JwtStrategy } from '@/business/controllers/auth/strategy/jwt.strategy';
import { LocalStrategy } from '@/business/controllers/auth/strategy/local.strategy';
import { CompanyRepository } from '@/business/repositories/company/company.repository';
import { ConsumerRepository } from '@/business/repositories/consumer/consumer.repository';
import { FilmmakerRepository } from '@/business/repositories/filmmaker/filmmaker.repository';
import { UserRepository } from '@/business/repositories/user/user.repository';
import { AuthService } from '@/business/services/auth.service';
import { CONFIG } from '@/configs/config';

import { CompanyModule } from './company.module';
import { ConsumerModule } from './consumer.module';
import { FilmmakerModule } from './filmmaker.module';
import { UserModule } from './user.module';

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
