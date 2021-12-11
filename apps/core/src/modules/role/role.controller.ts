import { RoleCreateDto } from '@app/common/dtos/core';
import { RoleUpdateDto } from '@app/common/dtos/core/role/role-update.dto';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RoleService } from './role.service';

@Controller()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @MessagePattern({ role: 'find' })
  async find() {
    await this.roleService.find();
  }

  @MessagePattern({ role: 'create' })
  async create(dto: RoleCreateDto) {
    await this.roleService.create(dto);
  }

  @MessagePattern({ role: 'update' })
  async update(dto: RoleUpdateDto) {
    await this.roleService.update(dto);
  }
}
