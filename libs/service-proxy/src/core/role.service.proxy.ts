import { RoleCreateDto, RoleUpdateDto } from '@app/common/dtos/core';
import { RoleEntity } from '@app/common/entities/core';
import { Injectable } from '@nestjs/common';
import { CoreServiceClient } from './core.service.client';

@Injectable()
export class RoleServiceProxy {
  constructor(private readonly client: CoreServiceClient) {}

  find() {
    return this.client.request<RoleEntity[]>({ role: 'find' }, {});
  }

  create(dto: RoleCreateDto) {
    return this.client.request<void>({ role: 'create' }, dto);
  }

  update(dto: RoleUpdateDto) {
    return this.client.request<void>({ role: 'update' }, dto);
  }
}
