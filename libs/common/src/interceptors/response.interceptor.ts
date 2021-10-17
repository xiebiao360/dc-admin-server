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
      map((m) => {
        if (m instanceof ResultUtil) {
          return m;
        }
        return ResultUtil.data(m);
      }),
      catchError((err) => of(ResultUtil.exception(err))),
    );
  }
}
