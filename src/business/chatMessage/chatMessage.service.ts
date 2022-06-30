import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ChatMessageEntity } from './chatMessage.entity';

@Injectable()
export class ChatMessageService {
  constructor(
    @InjectRepository(ChatMessageEntity)
    private repository: Repository<ChatMessageEntity>,
  ) {}
}
