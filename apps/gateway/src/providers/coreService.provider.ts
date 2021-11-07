import { GlobalConstant } from '@app/common/constants/global.constant';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, TcpClientOptions } from '@nestjs/microservices';

export default {
  provide: GlobalConstant.CORE_SERVICE,
  useFactory: (configService: ConfigService) => {
    const serviceOptions = configService.get<TcpClientOptions>('service.core');
    return ClientProxyFactory.create(serviceOptions);
  },
  inject: [ConfigService],
};
