import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default registerAs('service', () => ({
  core: {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001,
    },
  },
}));
