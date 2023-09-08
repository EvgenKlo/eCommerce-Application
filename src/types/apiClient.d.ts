export enum clientType {
  regular = 'regular',
  anonymous = 'anonymous',
  password = 'password',
  token = 'token',
}
export type returnType<T> = Promise<{ data: T | undefined; error: string }>;
