import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';

import { EmailInterceptor } from '@/interceptors/email.interceptors';

import { VerifyCodeDTO } from './dto/verifyCode.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @UseInterceptors(EmailInterceptor)
  @Post('verify')
  async verifyCode(@Body() { email, code }: VerifyCodeDTO) {
    return this.service.verifyCode(email, code);
  }
}
