import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { LoggedRequest } from '@/interfaces/request.interfaces';

@Injectable()
export class EmailConfirmationGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request: LoggedRequest = context.switchToHttp().getRequest();

    if (!request.user?.emailVerified) {
      throw new UnauthorizedException('Email not verified');
    }

    return true;
  }
}
