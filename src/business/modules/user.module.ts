import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from '@/business/controllers/user/user.controller';
import { UserEntity } from '@/business/repositories/user/user.entity';
import { UserRepository } from '@/business/repositories/user/user.repository';
import { UserService } from '@/business/services/user.service';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserRepository],
  exports: [TypeOrmModule, UserRepository],
})
export class UserModule {}
