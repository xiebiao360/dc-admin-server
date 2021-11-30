import { CoreServiceClient } from '@app/common/clients/core.service.client';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import coreServiceProvider from '../../providers/coreService.provider';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [
    coreServiceProvider,
    AuthService,
    LocalStrategy,
    CoreServiceClient,
  ],
})
export class AuthModule {}
