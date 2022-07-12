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
  password: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  verificationCode: number;

  @Exclude({ toPlainOnly: true })
  @Column()
  verificationCodeExpiration: Date;

  @Column({ name: 'email_verified', default: false })
  emailVerified?: boolean;

  @Column()
  role: EUserRole;

  toJSON() {
    return instanceToPlain(this);
  }
}
