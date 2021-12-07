import {
  PermissionCreateDto,
  PermissionUpdateDto,
} from '@app/common/dtos/core';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PermissionService } from './permission.service';

@Controller()
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  find(@Payload() { parentId }) {
    return this.permissionService.find(parentId);
  }

  @MessagePattern({ permission: 'create' })
  async create(@Payload() dto: PermissionCreateDto) {
    await this.permissionService.create(dto);
  }

  async update(@Payload() dto: PermissionUpdateDto) {
    await this.permissionService.update(dto);
  }

  async delete(@Payload() { ids }) {
    await this.permissionService.delete(ids);
  }
}
