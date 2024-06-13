import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RcpCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const rcpError = exception.getError();

    if (
      typeof rcpError === 'object' &&
      'status' in rcpError &&
      'message' in rcpError
    ) {
      return response.status(rcpError.status).json({
        status: isNaN(+rcpError.status) ? 400 : rcpError.status,
        message: rcpError.message,
      });
    }

    return response.status(400).json({
      status: 400,
      message: rcpError,
    });
  }
}
