import { Tenant } from '@app/core/tenant.entity';
import { User } from '@app/core/user.entity';

export abstract class ContextProvider {
  abstract getOptionalTenant(): Tenant | undefined;
  abstract getTenant(): Tenant;
  abstract getOptionalUser(): User | undefined;
  abstract getUser(): User;
}
