import { CreateByLocalDto } from '@app/common/dtos/core';
import { UserEntity } from '@app/common/entities/core/user.entity';
import { Injectable } from '@nestjs/common';
import { CoreServiceClient } from './core.service.client';

@Injectable()
export class UserServiceProxy {
  constructor(private readonly client: CoreServiceClient) {}

  findById(id: number) {
    return this.client.request<UserEntity>({ user: 'findById' }, { id });
  }

  findByAccountAndPassword(data: { account: string; password: string }) {
    return this.client.request<UserEntity>(
      { user: 'findByAccountAndPassword' },
      data,
    );
  }

  createByLocal(data: CreateByLocalDto) {
    return this.client.request<void>({ user: 'createByLocal' }, data);
  }
}
