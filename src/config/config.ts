import { ConfigFactoryKeyHost, registerAs } from '@nestjs/config';

export interface AppConfig {
  port: number;
  env: AppEnv;
  accessTokenSecret: string;
  refreshTokenSecret: string;
  accessTokenValidity: number;
  refreshTokenValidity: number;
}

export type AppEnv = 'development' | 'production';

type ConfigFactory<T> = (() => T) & ConfigFactoryKeyHost<T>;

export const appConfig: ConfigFactory<AppConfig> = registerAs('app', () => ({
  port: parseInt(process.env.PORT!, 10),
  env: process.env.NODE_ENV as AppEnv,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET!,
  accessTokenValidity: parseInt(process.env.ACCESS_TOKEN_VALIDITY_IN_SECONDS!, 10),
  refreshTokenValidity: parseInt(process.env.REFRESH_TOKEN_VALIDITY_IN_SECONDS!, 10),
}));
