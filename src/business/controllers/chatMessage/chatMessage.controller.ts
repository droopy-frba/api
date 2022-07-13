import { Controller } from '@nestjs/common';

import { ChatMessageService } from '@/business/services/chatMessage.service';

@Controller('chat_message')
export class ChatMessageController {
  constructor(private service: ChatMessageService) {}
}
