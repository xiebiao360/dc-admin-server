import { CreateByLocalDto } from '@app/common/dtos/core/user/create-by-local.dto';
import { UserServiceProxy } from '@app/service-proxy';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserServiceProxy) {}
  registerByLocal(dto: CreateByLocalDto) {
    return this.userService.createByLocal(dto);
  }

  async validateUser(account: string, password: string) {
    const entityObs = await this.userService.findByAccountAndPassword({
      account,
      password,
    });
    return entityObs;
  }
}
