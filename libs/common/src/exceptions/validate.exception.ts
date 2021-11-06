import { ResultCodeEnum } from '../enums/result-code.enum';
import { CustomException } from './custom.exception';

export class ValidateException extends CustomException {
  constructor(message: string) {
    super(message, ResultCodeEnum.ValidateError);
  }
}
