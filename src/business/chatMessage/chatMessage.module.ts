import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatMessageEntity } from './chatMessage.entity';
import { ChatMessageService } from './chatMessage.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessageEntity])],
  providers: [ChatMessageService],
  exports: [TypeOrmModule],
})
export class ChatMessageModule {}
