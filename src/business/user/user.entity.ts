import { Exclude, instanceToPlain } from 'class-transformer';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '@/business/base.entity';
import { EUserRole } from '@/enums/user.enums';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password?: string;

  @Column()
  verificationToken: string;

  @Column()
  verificationTokenExpiration: Date;

  @Column({ name: 'activation_status' })
  activationStatus: string;

  @Column()
  role: EUserRole;

  toJSON() {
    return instanceToPlain(this);
  }
}
