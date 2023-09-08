export type returnType<T> = Promise<{ data: T | undefined; error: string }>;
