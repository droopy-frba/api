import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { UserEntity } from '@/business/user/user.entity';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<UserEntity> {
    const lowercaseEmail = email.toLowerCase();
    const user = await this.authService.validateUserCredentials(lowercaseEmail, password);
    if (!user) throw new BadRequestException('Invalid credentials');
    if (user.deletedAt) throw new BadRequestException('The user is not active');
    return user;
  }
}
