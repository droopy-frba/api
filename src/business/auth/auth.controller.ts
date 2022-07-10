import { BadRequestException, Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { EUserRole } from '@/enums/user.enums';

import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signup.dto';

@UsePipes(new ValidationPipe())
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

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
}
