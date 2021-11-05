import { Module } from '@nestjs/common';
import coreServiceProvider from '../../providers/coreService.provider';
import { AuthController } from './auth.controller';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [coreServiceProvider],
})
export class AuthModule {}
