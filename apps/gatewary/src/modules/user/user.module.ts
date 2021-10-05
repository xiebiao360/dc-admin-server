import { Module } from '@nestjs/common';
import coreServiceProvider from '../../providers/coreService.provider';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [coreServiceProvider],
})
export class UserModule {}
