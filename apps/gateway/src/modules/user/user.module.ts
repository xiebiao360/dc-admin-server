import { CoreServiceProxyModule } from '@app/service-proxy';
import { Module } from '@nestjs/common';

@Module({
  imports: [CoreServiceProxyModule],
})
export class UserModule {}
