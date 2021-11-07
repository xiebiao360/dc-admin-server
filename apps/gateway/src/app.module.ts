import { CommonModule } from '@app/common';
import { CustomProvider } from '@app/common/providers/custom.provider';
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
  providers: [...CustomProvider.forResponseProviders()],
})
export class AppModule {}
