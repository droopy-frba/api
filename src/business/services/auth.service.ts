import { BadRequestException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';

import { SignupDTO } from '@/business/controllers/auth/dto/signup.dto';
import { CompanyRepository } from '@/business/repositories/company/company.repository';
import { ConsumerEntity } from '@/business/repositories/consumer/consumer.entity';
import { ConsumerRepository } from '@/business/repositories/consumer/consumer.repository';
import { FilmmakerEntity } from '@/business/repositories/filmmaker/filmmaker.entity';
import { FilmmakerRepository } from '@/business/repositories/filmmaker/filmmaker.repository';
import { UserEntity } from '@/business/repositories/user/user.entity';
import { UserRepository } from '@/business/repositories/user/user.repository';
import { CONFIG } from '@/configs/config';
import { EUserRole } from '@/enums/user.enums';
import { compareHashes, hashString } from '@/helpers/password.helpers';
import { generateVerificationCode } from '@/helpers/verificationCode.helpers';
import mailerService from '@/services/sendgrid.services';
import { generateVerifyUserEmail } from '@/templates/verifyEmail.templates';

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
      const verificationCode = generateVerificationCode();
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
      return this.login(savedUser);
    } catch (error) {
      await this.rollbackSignup(savedUser, savedConsumer, savedFilmmaker);
      throw error;
    }
  }

  async login(user: UserEntity) {
    const { expiresIn } = CONFIG.jwt;
    const payload = { email: user.email };
    return {
      user,
      token: this.jwtService.sign(payload, { expiresIn }),
      expiresIn,
    };
  }

  async validateUserCredentials(email: string, password: string) {
    const data = await this.userRepository.findByEmail(email);
    if (data) {
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
