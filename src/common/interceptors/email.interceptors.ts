import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

export interface Request<T> {
  body: T;
}

@Injectable()
export class EmailInterceptor<T> implements NestInterceptor<T, Request<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Request<T>> {
    const request = context.switchToHttp().getRequest();
    if (request.body && request.body.email) {
      request.body.email = request.body.email.toLowerCase();
    }
    return next.handle();
  }
}
