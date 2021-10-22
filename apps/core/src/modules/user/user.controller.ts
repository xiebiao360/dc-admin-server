import { CreateUserByLocalDto } from '@app/common/dtos/core/create-user-by-local.dto';
import { ResponseInterceptor } from '@app/common/interceptors/response.interceptor';
import { Controller, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import { UserService } from './user.service';

@Controller('user')
@UseInterceptors(ResponseInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('createByLocal')
  @Transaction()
  create(
    @Payload() dto: CreateUserByLocalDto,
    @TransactionManager() manager: EntityManager,
  ) {
    return this.userService.createByLocal(manager, dto);
  }

  @MessagePattern('findAll')
  findAll() {
    return this.userService.findAll();
  }
}
