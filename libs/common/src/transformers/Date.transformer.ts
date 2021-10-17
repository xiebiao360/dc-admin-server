import dayjs from 'dayjs';
import { ValueTransformer } from 'typeorm';

function dateTransformer() {
  return {
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
}

export { dateTransformer };
