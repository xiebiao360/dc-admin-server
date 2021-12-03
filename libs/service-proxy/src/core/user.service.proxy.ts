import { UserConstant } from '@app/common/constants/core/user.constant';
import { CreateByLocalDto } from '@app/common/dtos/core/user/create-by-local.dto';
import { UserEntity } from '@app/common/entities/core/user.entity';
import { Injectable } from '@nestjs/common';
import { CoreServiceClient } from './core.service.client';

@Injectable()
export class UserServiceProxy {
  constructor(private readonly client: CoreServiceClient) {}

  findById(id: number) {
    return this.client.request<UserEntity>(UserConstant.FIND_BY_ID, { id });
  }

  findByAccountAndPassword(data: { account: string; password: string }) {
    return this.client.request<UserEntity>(
      UserConstant.FIND_BY_ACCOUNT_AND_PASSWORD,
      data,
    );
  }

  createByLocal(data: CreateByLocalDto) {
    return this.client.request<void>(UserConstant.REGISTER_BY_LOCAL, data);
  }
}
