import { CommonModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import serviceConfig from './config/service.config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [serviceConfig],
      isGlobal: true,
    }),
    CommonModule,
    AuthModule,
  ],
})
export class AppModule {}
