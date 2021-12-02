import { GlobalConstant } from '@app/common/constants/global.constant';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, TcpClientOptions } from '@nestjs/microservices';
import ServiceConfig from '../service.config';
import { CoreServiceClient } from './core.service.client';
import { UserServiceProxy } from './user.service.proxy';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ServiceConfig],
      // isGlobal: true,
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
  ],
  exports: [CoreServiceModule, UserServiceProxy],
})
export class CoreServiceModule {}
