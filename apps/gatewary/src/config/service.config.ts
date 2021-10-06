import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default registerAs('service', () => ({
  core: {
    transport: Transport.TCP,
    options: {
      host: process.env.SERVICE_CORE_HOST || 'localhost',
      port: process.env.SERVICE_CORE_PORT || 3001,
    },
  },
}));
