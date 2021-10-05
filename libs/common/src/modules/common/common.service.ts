import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  hello() {
    return 'hello';
  }
}
