import { BadRequestException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcryptjs';
import { plainToClass } from 'class-transformer';

import { CONFIG } from '@/configs/config';
import { EUserRole } from '@/enums/user.enums';
import { compareHashes, hashString } from '@/helpers/password.helpers';

import { ConsumerEntity } from '../consumer/consumer.entity';
import { ConsumerRepository } from '../consumer/consumer.repository';
import { FilmmakerEntity } from '../filmmaker/filmmaker.entity';
import { FilmmakerRepository } from '../filmmaker/filmmaker.repository';
import { UserEntity } from '../user/user.entity';
import { UserRepo } from '../user/user.repository';
import { SignupDTO } from './dto/signup.dto';

export class AuthService {
  constructor(
    @Inject(UserRepo)
    private readonly userRepository: UserRepo,
    @Inject(ConsumerRepository)
    private readonly consumerRepository: ConsumerRepository,
    @Inject(FilmmakerRepository)
    private readonly filmmakerRepository: FilmmakerRepository,
    private jwtService: JwtService,
  ) {}

  async signup(userDTO: SignupDTO) {
    const existingUser = await this.userRepository.findByEmail(userDTO.email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const verificationToken = await this.createUserToken();

    const hashedPassword = await hashString(userDTO.password);
    const user = plainToClass(UserEntity, {
      name: userDTO.name,
      lastName: userDTO.lastName,
      email: userDTO.email,
      password: hashedPassword,
      role: userDTO.role,
      verificationToken: verificationToken.token,
      verificationTokenExpiration: verificationToken.expiration,
    });

    await this.userRepository.save(user);

    if (user.role === EUserRole.CONSUMER) {
      await this.consumerRepository.save(this.createConsumer(userDTO, user));
    } else {
      await this.filmmakerRepository.save(this.createFilmmaker(userDTO, user));
    }
    // mandar email
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

  private async createUserToken() {
    // Token
    const currentDate = new Date().toUTCString();
    const randomNumber = (Math.random() * 100000).toString();
    const token = await hash(currentDate.concat(randomNumber), 10);
    // Expiration
    const { expiresIn } = CONFIG.jwt;
    const date = new Date();
    date.setSeconds(date.getSeconds() + expiresIn);
    return {
      token: token.split('.').join(''),
      expiration: date,
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
