import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CoreService {
  constructor(private readonly configService: ConfigService) {}
  getHello(): string {
    const user = this.configService.get<string>('database.user');
    console.log(user);
    return 'Hello World!';
  }
}
