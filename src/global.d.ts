import { User as UserEntity, TenantWithParent } from '@core';

declare global {
  declare namespace Express {
    interface Request {
      currentTenant?: TenantWithParent;
      currentUser?: UserEntity;
    }
  }

  declare namespace Common {
    type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;
  }
}
