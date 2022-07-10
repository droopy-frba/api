import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DB_CONFIG } from '@/configs/db';

import { AuthModule } from './business/auth/auth.module';
import { ChatMessageModule } from './business/chatMessage/chatMessage.module';
import { CompanyModule } from './business/company/company.module';
import { ConsumerModule } from './business/consumer/consumer.module';
import { FilmPostulationModule } from './business/filmPostulation/filmPostulation.module';
import { FilmSearchModule } from './business/filmSearch/filmSearch.module';
import { FilmmakerModule } from './business/filmmaker/filmmaker.module';
import { FilmmakerReviewModule } from './business/filmmakerReview/filmmakerReview.module';
import { PaymentModule } from './business/payment/payment.module';
import { SuscriptionModule } from './business/suscription/suscription.module';
import { UserModule } from './business/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(DB_CONFIG),
    UserModule,
    ConsumerModule,
    FilmmakerModule,
    AuthModule,
    PaymentModule,
    SuscriptionModule,
    FilmmakerReviewModule,
    FilmSearchModule,
    FilmPostulationModule,
    CompanyModule,
    ChatMessageModule,
  ],
})
export class AppModule {}
