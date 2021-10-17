import { CreateUserByLocalDto } from '@app/common/dtos/core/create-user-by-local.dto';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(@Inject('CORE_SERVICE') private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createUserDto: CreateUserByLocalDto) {
    return this.client.send('createByLocal', createUserDto);
  }

  @Get()
  listUsers() {
    return this.client.send('findAll', {});
  }
}
