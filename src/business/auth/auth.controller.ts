import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { EUserRole } from '@/enums/user.enums';
import { JwtAuthGuard } from '@/guards/jwtAuth.guards';
import { LocalAuthGuard } from '@/guards/localAuth.guards';
import { EmailInterceptor } from '@/interceptors/email.interceptors';
import { LoggedRequest } from '@/interfaces/request.interfaces';

import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signup.dto';

@UsePipes(new ValidationPipe())
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @UseInterceptors(EmailInterceptor)
  @Post('signup')
  async signup(@Body() body: SignupDTO) {
    if (body.role === EUserRole.CONSUMER && !body.consumer) {
      throw new BadRequestException('Missing consumer data');
    }
    if (body.role === EUserRole.FILMMAKER && !body.filmmaker) {
      throw new BadRequestException('Missing filmmaker data');
    }
    return this.service.signup(body);
  }

  @UseInterceptors(EmailInterceptor)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: LoggedRequest) {
    return this.service.login(req.user);
  }
}
