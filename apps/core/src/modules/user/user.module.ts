import { AccountEntity } from '@app/common/entities/core/account.entity';
import { UserEntity } from '@app/common/entities/core/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, UserEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
