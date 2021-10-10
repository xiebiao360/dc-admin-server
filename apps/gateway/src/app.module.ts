import { CommonModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import serviceConfig from './config/service.config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [serviceConfig],
      isGlobal: true,
    }),
    CommonModule,
    UserModule,
  ],
})
export class AppModule {}
