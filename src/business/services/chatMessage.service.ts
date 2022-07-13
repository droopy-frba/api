import { Injectable } from '@nestjs/common';

import { ChatMessageRepository } from '@/business/repositories/chatMessage/chatMessage.repository';

@Injectable()
export class ChatMessageService {
  constructor(private repository: ChatMessageRepository) {}
}
