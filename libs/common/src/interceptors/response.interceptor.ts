import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';
import { ResultUtil } from '../utils/result.util';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResultUtil<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<ResultUtil<T>> | Promise<Observable<ResultUtil<T>>> {
    return next.handle().pipe(
      map((data) => {
        if (!data) {
          return ResultUtil.data(data);
        }
        if (data instanceof ResultUtil) {
          return data;
        }
        if (
          ['code', 'data', 'message'].every((e) =>
            Object.prototype.hasOwnProperty.call(data, e),
          )
        ) {
          return data;
        }
        return ResultUtil.data(data);
      }),
      catchError((err) => of(ResultUtil.exception(err))),
    );
  }
}
