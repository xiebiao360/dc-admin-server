import { UserConstant } from '@app/common/constants/core/user.constant';
import { GlobalConstant } from '@app/common/constants/global.constant';
import { CreateByLocalDto } from '@app/common/dtos/core/user/create-by-local.dto';
import { UserEntity } from '@app/common/entities/core/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject(GlobalConstant.CORE_SERVICE) private readonly client: ClientProxy,
  ) {}
  registerByLocal(dto: CreateByLocalDto) {
    return this.client.send(UserConstant.REGISTER_BY_LOCAL, dto);
  }

  validateUser(account: string, password: string) {
    const entityObs = this.client.send<UserEntity>(
      UserConstant.FIND_BY_ACCOUNT_AND_PASSWORD,
      { account, password },
    );
    return lastValueFrom(entityObs);
  }
}
