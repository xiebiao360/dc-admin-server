import {
  PermissionCreateDto,
  PermissionUpdateDto,
} from '@app/common/dtos/core';
import { PermissionEntity } from '@app/common/entities/core';
import { Injectable } from '@nestjs/common';
import { CoreServiceClient } from './core.service.client';

@Injectable()
export class PermissionServiceProxy {
  constructor(private readonly client: CoreServiceClient) {}

  find(parentId?: number) {
    return this.client.request<PermissionEntity[]>(
      { permission: 'find' },
      { parentId },
    );
  }

  create(dto: PermissionCreateDto) {
    return this.client.request<void>({ permission: 'create' }, dto);
  }

  update(dto: PermissionUpdateDto) {
    return this.client.request<void>({ permission: 'update' }, dto);
  }

  delete(ids: number[]) {
    return this.client.request<void>({ permission: 'delete' }, { ids });
  }
}
