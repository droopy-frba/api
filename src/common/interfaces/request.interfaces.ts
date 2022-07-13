import { UserEntity } from '@/business/repositories/user/user.entity';

export interface LoggedRequest extends Request {
  user: UserEntity;
}
