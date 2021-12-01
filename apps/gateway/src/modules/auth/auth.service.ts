import { CoreServiceClient } from '@app/common/clients/core.service.client';
import { UserConstant } from '@app/common/constants/core/user.constant';
import { CreateByLocalDto } from '@app/common/dtos/core/user/create-by-local.dto';
import { UserEntity } from '@app/common/entities/core/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly client: CoreServiceClient) {}
  registerByLocal(dto: CreateByLocalDto) {
    return this.client.request(UserConstant.REGISTER_BY_LOCAL, dto);
  }

  validateUser(account: string, password: string) {
    const entityObs = this.client.request<UserEntity>(
      UserConstant.FIND_BY_ACCOUNT_AND_PASSWORD,
      { account, password },
    );
    return entityObs;
  }
}
