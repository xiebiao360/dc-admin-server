import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { GlobalConstant } from '../constants/global.constant';
import { ResultCodeEnum } from '../enums/result-code.enum';
import { IServiceClient } from '../interfaces/service.client.interface';
import { ResultUtil } from '../utils/result.util';

@Injectable()
export class CoreServiceClient implements IServiceClient {
  constructor(
    @Inject(GlobalConstant.CORE_SERVICE) private readonly client: ClientProxy,
  ) {}

  async request<T>(pattern: string, data: any): Promise<T> {
    const response = this.client.send<ResultUtil<T>>(pattern, data);
    const result = await lastValueFrom(response);
    if (result.code === ResultCodeEnum.Success) {
      return result.data;
    }
    throw new Error(result.message);
  }
}
