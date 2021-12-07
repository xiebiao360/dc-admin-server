import { PatternMetadata } from '@nestjs/microservices';

export interface IServiceClient {
  request<T>(pattern: PatternMetadata, data: T): Promise<T>;
}
