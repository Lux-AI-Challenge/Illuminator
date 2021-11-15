type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
