import { UserConstant } from '@app/common/constants/core/user.constant';
import { CreateByLocalDto } from '@app/common/dtos/core/user/create-by-local.dto';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(UserConstant.REGISTER_BY_LOCAL)
  @Transaction()
  async create(
    @Payload() dto: CreateByLocalDto,
    @TransactionManager() manager: EntityManager,
  ) {
    await this.userService.createByLocal(manager, dto);
  }

  @MessagePattern(UserConstant.FIND_ALL)
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern(UserConstant.FIND_BY_ACCOUNT_AND_PASSWORD)
  findByAccountAndPassword(@Payload() { account, password }) {
    return this.userService.findByAccountAndPassword(account, password);
  }
}
