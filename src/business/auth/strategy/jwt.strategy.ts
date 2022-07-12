import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserEntity } from '@/business/user/user.entity';
import { CONFIG } from '@/configs/config';

import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: CONFIG.jwt.secretKey,
    });
  }

  async validate(payload: { email: string }): Promise<UserEntity> {
    const user = await this.authService.validateAuthToken(payload.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return user;
  }
}
