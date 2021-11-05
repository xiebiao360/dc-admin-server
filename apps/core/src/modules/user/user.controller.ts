import { UserConstant } from '@app/common/constants/core/user.constant';
import { RegisterByLocalDto } from '@app/common/dtos/core/user/register-by-local.dto';
import { ResponseInterceptor } from '@app/common/interceptors/response.interceptor';
import { Controller, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import { UserService } from './user.service';

@Controller('user')
@UseInterceptors(ResponseInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(UserConstant.REGISTER_BY_LOCAL)
  @Transaction()
  create(
    @Payload() dto: RegisterByLocalDto,
    @TransactionManager() manager: EntityManager,
  ) {
    return this.userService.registerByLocal(manager, dto);
  }

  @MessagePattern(UserConstant.FIND_ALL)
  findAll() {
    return this.userService.findAll();
  }
}
