function enumTransformer<T extends { [x: number | string]: string | number }>(
  type: T,
) {
  return {
    to(value: string | number) {
      return type[value];
    },
    from(value: string | number) {
      return type[value];
    },
  };
}

export { enumTransformer };
