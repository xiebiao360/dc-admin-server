import { Exclude } from 'class-transformer';
import { ResultCodeEnum } from '../enums';
import { CustomException } from '../exceptions/custom.exception';

export class ResultUtil<T> {
  readonly code: number;
  readonly data: T;
  @Exclude()
  readonly error: Error;
  readonly message: string;

  constructor(code: number, data: T, error: Error, message: string) {
    this.code = code;
    this.data = data;
    this.message = message;
    this.error = error;
  }

  static ok() {
    return new ResultUtil(ResultCodeEnum.Success, true, null, '');
  }
  static data<T>(data: T) {
    return new ResultUtil(ResultCodeEnum.Success, data, null, '');
  }
  static exception(error: Error) {
    console.error(error.stack);
    if (error instanceof CustomException) {
      return new ResultUtil(error.code, null, error, error.message);
    }
    return new ResultUtil(ResultCodeEnum.Fail, null, error, error.message);
  }
  static error(message: string) {
    return new ResultUtil(
      ResultCodeEnum.Fail,
      null,
      new Error(message),
      message,
    );
  }

  isError() {
    return !!this.error || !!this.message;
  }
}
