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

  @MessagePattern(UserConstant.FIND_BY_ID)
  findById(@Payload() { id }) {
    return this.userService.findOne(id);
  }

  @MessagePattern(UserConstant.FIND_BY_ACCOUNT_AND_PASSWORD)
  async findByAccountAndPassword(@Payload() { account, password }) {
    const result = await this.userService.findByAccountAndPassword(
      account,
      password,
    );
    return result;
  }
}
