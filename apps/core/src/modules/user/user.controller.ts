import { CreateByLocalDto } from '@app/common/dtos/core';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ user: 'createByLocal' })
  @Transaction()
  async createByLocal(
    @Payload() dto: CreateByLocalDto,
    @TransactionManager() manager: EntityManager,
  ) {
    await this.userService.createByLocal(manager, dto);
  }

  @MessagePattern({ user: 'findById' })
  findById(@Payload() { id }) {
    return this.userService.findOne(id);
  }

  @MessagePattern({ user: 'findByAccountAndPassword' })
  async findByAccountAndPassword(@Payload() { account, password }) {
    const result = await this.userService.findByAccountAndPassword(
      account,
      password,
    );
    return result;
  }
}
