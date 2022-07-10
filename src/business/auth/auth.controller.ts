import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signup.dto';

@UsePipes(new ValidationPipe())
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SignupDTO) {
    return this.service.signup(body);
  }
}
