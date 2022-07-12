import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserRepository],
  exports: [TypeOrmModule, UserRepository],
})
export class UserModule {}
