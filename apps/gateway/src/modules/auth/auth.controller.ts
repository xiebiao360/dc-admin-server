import { CreateByLocalDto } from '@app/common/dtos/core/user/create-by-local.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateByLocalDto) {
    return this.authService.registerByLocal(createUserDto);
  }

  @Get('profile')
  getProfile() {
    return this.authService.findByAccount();
  }
}
