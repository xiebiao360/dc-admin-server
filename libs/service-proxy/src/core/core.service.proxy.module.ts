import { GlobalConstant } from '@app/common/constants/global.constant';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, TcpClientOptions } from '@nestjs/microservices';
import ServiceConfig from '../service.config';
import { CoreServiceClient } from './core.service.client';
import { GroupServiceProxy } from './group.service.proxy';
import { PermissionServiceProxy } from './permission.service.proxy';
import { RoleServiceProxy } from './role.service.proxy';
import { UserServiceProxy } from './user.service.proxy';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ServiceConfig],
    }),
  ],
  providers: [
    {
      provide: GlobalConstant.CORE_SERVICE,
      useFactory: (configService: ConfigService) => {
        const serviceOptions =
          configService.get<TcpClientOptions>('service.core');
        return ClientProxyFactory.create(serviceOptions);
      },
      inject: [ConfigService],
    },
    CoreServiceClient,
    UserServiceProxy,
    RoleServiceProxy,
    GroupServiceProxy,
    PermissionServiceProxy,
  ],
  exports: [
    UserServiceProxy,
    RoleServiceProxy,
    GroupServiceProxy,
    PermissionServiceProxy,
  ],
})
export class CoreServiceProxyModule {}
