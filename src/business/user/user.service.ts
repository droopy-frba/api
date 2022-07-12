import { BadRequestException, Injectable } from '@nestjs/common';

import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async verifyCode(email: string, code: number) {
    const user = await this.repository.findByEmail(email);
    if (user.emailVerified) {
      throw new BadRequestException('Email already verified');
    }
    if (user.verificationCode !== code) {
      throw new BadRequestException('Invalid verification code');
    }
    if (user.verificationCodeExpiration.getTime() <= Date.now()) {
      throw new BadRequestException('Verification code expired');
    }
    await this.repository.update(user.uuid, { emailVerified: true });
    return user;
  }
}
