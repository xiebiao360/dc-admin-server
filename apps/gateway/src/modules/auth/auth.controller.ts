import { CreateByLocalDto } from '@app/common/dtos/core/user/create-by-local.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/register')
  create(@Body() createUserDto: CreateByLocalDto) {
    return this.authService.registerByLocal(createUserDto);
  }

  @Get('profile')
  getProfile() {
    // return this.authService.validateUser();
    return '';
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() req) {
    return req.user;
  }
}
