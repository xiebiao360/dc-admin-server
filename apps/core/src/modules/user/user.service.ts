import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getHello(name: string) {
    console.log('hello world xiebiao!');
    return `hello world ${name}!`;
  }
}
