import { CustomDecorator, SetMetadata } from '@nestjs/common';

import { EUserRole } from '@/enums/user.enums';

export const UserRoles = (...roles: EUserRole[]): CustomDecorator<string> => SetMetadata('roles', roles);
