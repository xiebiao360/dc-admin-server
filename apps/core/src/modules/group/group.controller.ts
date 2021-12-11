import { GroupCreateDto, GroupUpdateDto } from '@app/common/dtos/core';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GroupService } from './group.service';

@Controller()
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @MessagePattern({ role: 'create' })
  async create(dto: GroupCreateDto) {
    await this.groupService.create(dto);
  }

  @MessagePattern({ role: 'update' })
  async update(dto: GroupUpdateDto) {
    await this.groupService.update(dto);
  }
}
