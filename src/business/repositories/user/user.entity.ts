import { Exclude, instanceToPlain } from 'class-transformer';
import { Column, Entity, OneToOne } from 'typeorm';

import { BaseEntity } from '@/business/repositories/base.entity';
import { ConsumerEntity } from '@/business/repositories/consumer/consumer.entity';
import { FilmmakerEntity } from '@/business/repositories/filmmaker/filmmaker.entity';
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

  @OneToOne(() => ConsumerEntity)
  consumer?: ConsumerEntity;

  @OneToOne(() => FilmmakerEntity)
  filmmaker?: FilmmakerEntity;

  toJSON() {
    return instanceToPlain(this);
  }
}
