import { UserEntity } from '@app/common/entities/core/user.entity';
import { GenderEnum } from '@app/common/enums/gender.enum';
import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(@Inject('CORE_SERVICE') private readonly client: ClientProxy) {}

  @Get()
  get() {
    const user = new UserEntity();
    user.name = 'chenhuan';
    user.gender = GenderEnum.female;
    // console.log(JSON.stringify(user));
    // return this.client.send({ cmd: 'hello' }, 'xiebiao');
    return user;
  }

  @Get('/user')
  listUsers() {
    return this.client.send({ user: 'list' }, {});
  }
}
