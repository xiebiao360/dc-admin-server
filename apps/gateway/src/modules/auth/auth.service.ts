import { UserConstant } from '@app/common/constants/core/user.constant';
import { CreateByLocalDto } from '@app/common/dtos/core/user/create-by-local.dto';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(private readonly client: ClientProxy) {}
  registerByLocal(dto: CreateByLocalDto) {
    return this.client.send(UserConstant.REGISTER_BY_LOCAL, dto);
  }

  validateUser() {
    return this.client.send(UserConstant.FIND_BY_ACCOUNT, {});
  }
}
