import { AccountEntity, UserEntity } from '@app/common/entities/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';

/**
 * 用户
 */
@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, UserEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
