import { BadRequestException, Injectable } from '@nestjs/common';

import { UserRepository } from '@/business/repositories/user/user.repository';
import { generateVerificationCode } from '@/helpers/verificationCode.helpers';
import mailerService from '@/services/sendgrid.services';
import { generateVerifyUserEmail } from '@/templates/verifyEmail.templates';

import { UserEntity } from '../repositories/user/user.entity';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async verifyCode(email: string, code: number) {
    const user = await this.repository.findByEmail(email);
    this.checkEmailVerification(user);
    if (user.verificationCode !== code) {
      throw new BadRequestException('Invalid verification code');
    }
    if (user.verificationCodeExpiration.getTime() <= Date.now()) {
      throw new BadRequestException('Verification code expired');
    }
    await this.repository.update(user.uuid, { emailVerified: true });
    return { ...user, emailVerified: true };
  }

  async resendCode(user: UserEntity) {
    this.checkEmailVerification(user);
    const verificationCode = generateVerificationCode();
    await this.repository.update(user.uuid, {
      verificationCode: verificationCode.code,
      verificationCodeExpiration: verificationCode.expiration,
    });
    await mailerService(generateVerifyUserEmail([user.email], verificationCode.code));
  }

  private checkEmailVerification(user: UserEntity) {
    if (user.emailVerified) {
      throw new BadRequestException('Email already verified');
    }
  }
}
