import { Injectable } from '@nestjs/common';
import { CommonService } from '@app/common';

@Injectable()
export class AppService {
  constructor(private readonly commonService: CommonService) {}
  getHello(): string {
    const res = this.commonService.hello();
    return res;
  }
}
