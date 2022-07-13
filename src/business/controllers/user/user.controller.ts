import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { UserEntity } from '@/business/repositories/user/user.entity';
import { UserService } from '@/business/services/user.service';
import { JwtAuthGuard } from '@/guards/jwtAuth.guards';
import { LoggedRequest } from '@/interfaces/request.interfaces';

import { VerifyCodeDTO } from './dto/verifyCode.dto';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post('verify')
  async verifyCode(@Request() req: LoggedRequest, @Body() { code }: VerifyCodeDTO): Promise<UserEntity> {
    return this.service.verifyCode(req.user.email, code);
  }

  @UseGuards(JwtAuthGuard)
  @Post('resend-code')
  async resendCode(@Request() req: LoggedRequest) {
    return this.service.resendCode(req.user);
  }
}
