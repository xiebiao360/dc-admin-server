import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CoreModule } from './core.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CoreModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.SERVICE_CORE_HOST || 'localhost',
        port: process.env.SERVICE_CORE_PORT
          ? parseInt(process.env.SERVICE_CORE_PORT)
          : 3001,
      },
    },
  );
  app.listen();
}
bootstrap();
