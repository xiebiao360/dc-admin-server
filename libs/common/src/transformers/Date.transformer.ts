import dayjs from 'dayjs';
import { ValueTransformer } from 'typeorm';

export default {
  to(value: any) {
    if (value && value instanceof Date) {
      return dayjs(value).millisecond();
    }
    return null;
  },
  from(value: any) {
    if (value && typeof value === 'number') {
      return dayjs(value);
    }
    return null;
  },
} as ValueTransformer;
