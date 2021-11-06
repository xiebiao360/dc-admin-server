import { GlobalConstant } from '@app/common/constants/global.constant';
import { CreateByLocalDto } from '@app/common/dtos/core/user/create-by-local.dto';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(GlobalConstant.CORE_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateByLocalDto) {
    return this.client.send('createByLocal', createUserDto);
  }

  @Get()
  listUsers() {
    return this.client.send('findAll', {});
  }
}
