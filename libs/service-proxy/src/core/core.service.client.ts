import { GlobalConstant } from '@app/common/constants/global.constant';
import { ResultCodeEnum } from '@app/common/enums';
import { IServiceClient } from '@app/common/interfaces/service.client.interface';
import { ResultUtil } from '@app/common/utils/result.util';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, PatternMetadata } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CoreServiceClient implements IServiceClient {
  constructor(
    @Inject(GlobalConstant.CORE_SERVICE) private readonly client: ClientProxy,
  ) {}

  async request<T>(pattern: PatternMetadata, data: any): Promise<T> {
    const response = this.client.send<ResultUtil<T>>(pattern, data);
    const result = await lastValueFrom(response);
    if (result.code === ResultCodeEnum.Success) {
      return result.data;
    }
    return Promise.reject(result.message);
  }
}
