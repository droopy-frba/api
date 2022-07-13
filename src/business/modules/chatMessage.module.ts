import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatMessageController } from '@/business/controllers/chatMessage/chatMessage.controller';
import { ChatMessageEntity } from '@/business/repositories/chatMessage/chatMessage.entity';
import { ChatMessageRepository } from '@/business/repositories/chatMessage/chatMessage.repository';
import { ChatMessageService } from '@/business/services/chatMessage.service';

@Module({
  controllers: [ChatMessageController],
  imports: [TypeOrmModule.forFeature([ChatMessageEntity])],
  providers: [ChatMessageService, ChatMessageRepository],
  exports: [TypeOrmModule, ChatMessageService, ChatMessageRepository],
})
export class ChatMessageModule {}
