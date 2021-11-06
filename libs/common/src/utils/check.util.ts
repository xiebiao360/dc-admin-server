export class CheckUtil {
  static isNull<T>(value: T) {
    if (value === undefined) {
      return true;
    }
    if (value === null) {
      return true;
    }
    return false;
  }
  static isNullToDefault<T>(value: T, defaultValue: T) {
    if (this.isNull(value)) {
      return defaultValue;
    }
    return value;
  }
  static isNullToGet<T>(value: T, callback: () => T) {
    if (this.isNull(value)) {
      return callback();
    }
    return value;
  }
  static isNullOrEmpty(value: string) {
    if (this.isNull(value)) {
      return true;
    }
    if (value === '') {
      return true;
    }
    return false;
  }
  static isNullOrEmptyToDefault(value: string, defaultValue: string) {
    if (this.isNullOrEmpty(value)) {
      return defaultValue;
    }
    return value;
  }
  static isNullOrEmptyToGet(value: string, callback: () => string) {
    if (this.isNullOrEmpty(value)) {
      return callback();
    }
    return value;
  }
  static isBlank(value: string) {
    return new RegExp('^[ ]*$').test(value);
  }
  static isNullOrBlank(value: string) {
    if (this.isNull(value)) {
      return true;
    }
    if (this.isBlank(value)) {
      return true;
    }
    return false;
  }
  static isNullOrBlankToDefault(value: string, defaultValue: string) {
    if (this.isNullOrBlank(value)) {
      return defaultValue;
    }
    return value;
  }
  static isNullOrBlankToGet(value: string, callback: () => string) {
    if (this.isNullOrBlank(value)) {
      return callback();
    }
    return value;
  }
}
