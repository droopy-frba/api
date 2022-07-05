import { UserEntity } from '@/business/user/user.entity';

export interface LoggedRequest extends Request {
  user: UserEntity;
}
