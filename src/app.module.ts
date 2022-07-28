import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DB_CONFIG } from '@/configs/db';

import { AuthModule } from './business/modules/auth.module';
import { ChatMessageModule } from './business/modules/chatMessage.module';
import { CompanyModule } from './business/modules/company.module';
import { ConsumerModule } from './business/modules/consumer.module';
import { FilmPostulationModule } from './business/modules/filmPostulation.module';
import { FilmSearchModule } from './business/modules/filmSearch.module';
import { FilmmakerModule } from './business/modules/filmmaker.module';
import { FilmmakerReviewModule } from './business/modules/filmmakerReview.module';
import { PaymentModule } from './business/modules/payment.module';
import { ProductModule } from './business/modules/product.module';
import { SuscriptionModule } from './business/modules/suscription.module';
import { UserModule } from './business/modules/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(DB_CONFIG),
    UserModule,
    ConsumerModule,
    FilmmakerModule,
    AuthModule,
    PaymentModule,
    ProductModule,
    SuscriptionModule,
    FilmmakerReviewModule,
    FilmSearchModule,
    FilmPostulationModule,
    CompanyModule,
    ChatMessageModule,
  ],
})
export class AppModule {}
