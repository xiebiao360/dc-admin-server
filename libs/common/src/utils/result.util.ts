import { ResultCodeEnum } from '../enums/result-code.enum';

export class ResultUtil<T> {
  readonly code: number;
  readonly data: T;
  readonly error: Error;
  readonly message: string;

  constructor(code: number, data: T, error: Error, message: string) {
    this.code = code;
    this.data = data;
    this.message = message;
    this.error = error;
  }

  static ok() {
    return new ResultUtil(ResultCodeEnum.SUCCESS, true, null, '');
  }
  static data<T>(data: T) {
    return new ResultUtil(ResultCodeEnum.SUCCESS, data, null, '');
  }
  static exception(error: Error) {
    return new ResultUtil(ResultCodeEnum.FAIL, null, error, error.message);
  }
  static error(message: string) {
    return new ResultUtil(
      ResultCodeEnum.FAIL,
      null,
      new Error(message),
      message,
    );
  }

  isError() {
    return !!this.error || !!this.message;
  }
}
