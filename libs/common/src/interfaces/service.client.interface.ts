export interface IServiceClient {
  request<T>(pattern: string, data: T): Promise<T>;
}
