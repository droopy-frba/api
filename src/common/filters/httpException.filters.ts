import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { isArray } from 'class-validator';
import { Request, Response } from 'express';

import { IErrorResponse } from '@/interfaces/response.interfaces';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    let message: string;

    if (typeof exception.getResponse() === 'string') {
      message = exception.message;
    } else {
      const res = <IErrorResponse>exception.getResponse();
      message = isArray(res.message) ? res.message[0] : res.message;
    }
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response<IErrorResponse>>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    Logger.error(`Http Exception: ${request.url}`, exception.stack);

    response.status(status).json({
      message,
    });
  }
}
