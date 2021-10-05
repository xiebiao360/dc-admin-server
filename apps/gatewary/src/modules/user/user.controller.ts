import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(@Inject('CORE_SERVICE') private readonly client: ClientProxy) {}

  @Get()
  get() {
    return this.client.send({ cmd: 'hello' }, 'xiebiao');
  }
}
