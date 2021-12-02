import { CustomProvider } from '@app/common/providers/custom.provider';
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [...CustomProvider.forResponseProviders()],
})
export class AppModule {}
