import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

import { IErrorResponse } from '@/interfaces/response.interfaces';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response<IErrorResponse>>();
    const request = ctx.getRequest<Request>();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Something went wrong.';

    if (exception instanceof Error) {
      Logger.error(`Global Exception: ${request.url}`, exception.stack);
      message = exception.message;
    }

    response.status(status).json({
      message,
    });
  }
}
