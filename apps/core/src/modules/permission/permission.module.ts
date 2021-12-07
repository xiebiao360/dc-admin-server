import { PermissionEntity } from '@app/common/entities/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity])],
})
export class PermissionModule {}
