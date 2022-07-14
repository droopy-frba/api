import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository, TransactionManager } from 'typeorm';

import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async update(uuid: string, user: Partial<UserEntity>, @TransactionManager() transactionManager?: EntityManager) {
    if (transactionManager) {
      return transactionManager.update(UserEntity, uuid, user);
    }
    return this.update(uuid, user);
  }

  async findByEmail(email: string) {
    return this.repository.findOne({ email });
  }

  async save(user: UserEntity, @TransactionManager() transactionManager?: EntityManager) {
    if (transactionManager) {
      return transactionManager.save(UserEntity, user);
    }
    return this.repository.save(user);
  }

  async delete(uuid: string) {
    return this.repository.delete(uuid);
  }
}
