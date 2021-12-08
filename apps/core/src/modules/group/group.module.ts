import { GroupEntity } from '@app/common/entities/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * 用户组
 */
@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity])],
})
export class GroupModule {}
