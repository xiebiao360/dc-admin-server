import { GroupCreateDto, GroupUpdateDto } from '@app/common/dtos/core';
import { GroupEntity } from '@app/common/entities/core';
import { Injectable } from '@nestjs/common';
import { CoreServiceClient } from './core.service.client';

@Injectable()
export class GroupServiceProxy {
  constructor(private readonly client: CoreServiceClient) {}

  find() {
    return this.client.request<GroupEntity[]>({ group: 'find' }, {});
  }

  create(dto: GroupCreateDto) {
    return this.client.request<void>({ group: 'create' }, dto);
  }

  update(dto: GroupUpdateDto) {
    return this.client.request<void>({ group: 'update' }, dto);
  }
}
