import { ResultStatusEnum } from '../enums/result-status.enum';

export class ResultUtil<T> {
  readonly status: number;
  readonly data: T;
  readonly error: Error;
  readonly message: string;

  constructor(status: number, data: T, error: Error, message: string) {
    this.status = status;
    this.data = data;
    this.message = message;
    this.error = error;
  }

  static ok() {
    return new ResultUtil(ResultStatusEnum.SUCCESS, true, null, '');
  }
  static data<T>(data: T) {
    return new ResultUtil(ResultStatusEnum.SUCCESS, data, null, '');
  }
  static exception(status: ResultStatusEnum, error: Error) {
    return new ResultUtil(status, null, error, error.message);
  }
  static exceptionMessage(status: ResultStatusEnum, message: string) {
    return new ResultUtil(status, null, new Error(message), message);
  }

  isError() {}
}
