import { Module } from '@nestjs/common';
import coreServiceProvider from '../../providers/coreService.provider';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [coreServiceProvider, AuthService],
})
export class AuthModule {}
