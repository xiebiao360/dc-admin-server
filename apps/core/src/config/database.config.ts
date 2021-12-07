import {
  AccountEntity,
  GroupEntity,
  PermissionEntity,
  RoleEntity,
  UserEntity,
} from '@app/common/entities/core';
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 3306,
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || 'root',
  database: process.env.DATABASE_DB || 'test',
  entities: [
    AccountEntity,
    UserEntity,
    PermissionEntity,
    RoleEntity,
    GroupEntity,
  ],
  synchronize: true,
}));
