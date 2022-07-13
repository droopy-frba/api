import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';

import { UserService } from '@/business/services/user.service';
import { EmailInterceptor } from '@/interceptors/email.interceptors';

import { VerifyCodeDTO } from './dto/verifyCode.dto';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @UseInterceptors(EmailInterceptor)
  @Post('verify')
  async verifyCode(@Body() { email, code }: VerifyCodeDTO) {
    return this.service.verifyCode(email, code);
  }
}
