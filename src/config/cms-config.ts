import { ConfigFactoryKeyHost, registerAs } from '@nestjs/config';

export interface CmsConfig {
  baseApiUrl: string;
  baseAuthUrl: string;
  clientId: string;
  clientSecret: string;
  grantType: string;
  scope: string;
}

type ConfigFactory<T> = (() => T) & ConfigFactoryKeyHost<T>;

export const cmsConfig: ConfigFactory<CmsConfig> = registerAs('cms', () => ({
  baseApiUrl: process.env.CMS_BASE_API_URL!,
  baseAuthUrl: process.env.CMS_BASE_AUTH_URL!,
  clientId: process.env.CMS_CLIENT_ID!,
  clientSecret: process.env.CMS_CLIENT_SECRET!,
  grantType: process.env.CMS_GRANT_TYPE!,
  scope: process.env.CMS_SCOPE!,
}));
