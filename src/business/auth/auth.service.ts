import { BadRequestException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';

import { CompanyRepository } from '@/business/company/company.repository';
import { ConsumerEntity } from '@/business/consumer/consumer.entity';
import { ConsumerRepository } from '@/business/consumer/consumer.repository';
import { FilmmakerEntity } from '@/business/filmmaker/filmmaker.entity';
import { FilmmakerRepository } from '@/business/filmmaker/filmmaker.repository';
import { UserEntity } from '@/business/user/user.entity';
import { UserRepository } from '@/business/user/user.repository';
import { CONFIG } from '@/configs/config';
import { EUserRole } from '@/enums/user.enums';
import { compareHashes, hashString } from '@/helpers/password.helpers';
import mailerService from '@/services/sendgrid.services';
import { generateVerifyUserEmail } from '@/templates/verifyEmail.templates';

import { SignupDTO } from './dto/signup.dto';

export class AuthService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(ConsumerRepository)
    private readonly consumerRepository: ConsumerRepository,
    @Inject(FilmmakerRepository)
    private readonly filmmakerRepository: FilmmakerRepository,
    @Inject(CompanyRepository)
    private readonly companyRepository: CompanyRepository,
    private jwtService: JwtService,
  ) {}

  async signup(userDTO: SignupDTO) {
    let savedUser: UserEntity;
    let savedConsumer: ConsumerEntity;
    let savedFilmmaker: FilmmakerEntity;
    try {
      const existingUser = await this.userRepository.findByEmail(userDTO.email);
      if (existingUser) {
        throw new BadRequestException('User already exists');
      }

      const hashedPassword = await hashString(userDTO.password);
      const verificationCode = this.generateVerificationCode();
      const user = plainToClass(UserEntity, {
        name: userDTO.name,
        lastName: userDTO.lastName,
        email: userDTO.email,
        password: hashedPassword,
        role: userDTO.role,
        verificationCode: verificationCode.code,
        verificationCodeExpiration: verificationCode.expiration,
      });

      savedUser = await this.userRepository.save(user);

      if (user.role === EUserRole.CONSUMER) {
        savedConsumer = await this.consumerRepository.save(this.createConsumer(userDTO, user));
      } else {
        savedFilmmaker = await this.filmmakerRepository.save(this.createFilmmaker(userDTO, user));
      }
      await mailerService(generateVerifyUserEmail([user.email], verificationCode.code));
    } catch (error) {
      await this.rollbackSignup(savedUser, savedConsumer, savedFilmmaker);
      throw error;
    }
  }

  async login(user: UserEntity) {
    const { expiresIn } = CONFIG.jwt;
    const payload = { email: user.email };
    return {
      token: this.jwtService.sign(payload, { expiresIn }),
      expiresIn,
    };
  }

  async validateUserCredentials(email: string, password: string) {
    const data = await this.userRepository.findByEmail(email);
    if (data && data.emailVerified) {
      const validPassword = await compareHashes(password, data.password);
      if (validPassword) {
        return data;
      }
    }
    return null;
  }

  async validateAuthToken(email: string): Promise<UserEntity | null> {
    const data = await this.userRepository.findByEmail(email);
    if (data) {
      return data;
    }
    return null;
  }

  private async rollbackSignup(user?: UserEntity, consumer?: ConsumerEntity, filmmaker?: FilmmakerEntity) {
    if (consumer) {
      await this.consumerRepository.delete(consumer.uuid);
      await this.companyRepository.delete(consumer.company.uuid);
    }
    if (filmmaker) {
      await this.filmmakerRepository.delete(filmmaker.uuid);
    }
    if (user) {
      await this.userRepository.delete(user.uuid);
    }
  }

  private generateVerificationCode() {
    const { digits } = CONFIG.userVerification;
    const min = 10 ** (digits - 1);
    const max = Number('9'.repeat(digits));
    return {
      code: min + Math.floor(Math.random() * max),
      expiration: new Date(Date.now() + CONFIG.userVerification.expirationMinutes * 60000),
    };
  }

  private createConsumer(userDTO: SignupDTO, user: UserEntity) {
    return plainToClass(ConsumerEntity, {
      company: {
        name: userDTO.consumer.name,
        identifier: userDTO.consumer.identifier,
      },
      user,
    });
  }

  private createFilmmaker(userDTO: SignupDTO, user: UserEntity) {
    return plainToClass(FilmmakerEntity, {
      phoneBrand: userDTO.filmmaker.phoneBrand,
      phoneModel: userDTO.filmmaker.phoneModel,
      review: 0,
      user,
    });
  }
}
