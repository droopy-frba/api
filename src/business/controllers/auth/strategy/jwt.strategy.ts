import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserEntity } from '@/business/repositories/user/user.entity';
import { AuthService } from '@/business/services/auth.service';
import { CONFIG } from '@/configs/config';

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
