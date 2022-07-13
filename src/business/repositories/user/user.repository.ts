import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async update(uuid: string, user: Partial<UserEntity>) {
    return this.repository.update(uuid, user);
  }

  async findByEmail(email: string) {
    return this.repository.findOne({ email });
  }

  async save(user: UserEntity) {
    return this.repository.save(user);
  }

  async delete(uuid: string) {
    return this.repository.delete(uuid);
  }
}
