import { UserCreateByLocalDto } from '@app/common/dtos/core';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt.auth.guard';
import { LocalAuthGuard } from '../../guards/local.auth.guard';
import { AuthService } from './auth.service';

@ApiTags()
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/register')
  create(@Body() createUserDto: UserCreateByLocalDto) {
    return this.authService.registerByLocal(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/loginByLocal')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
