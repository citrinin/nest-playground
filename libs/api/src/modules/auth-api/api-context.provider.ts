import { ContextProvider } from '@app/core/modules/auth-core/context.provider';
import { Tenant } from '@app/core/tenant.entity';
import { User } from '@app/core/user.entity';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class ApiContextProvider implements ContextProvider {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  getOptionalTenant(): Tenant | undefined {
    return this.request.currentTenant;
  }

  getTenant(): Tenant {
    const tenant: Tenant | undefined = this.getOptionalTenant();
    if (!tenant) throw new Error('tenant is not provided');
    return tenant;
  }

  getOptionalUser(): User | undefined {
    return this.request.currentUser;
  }

  getUser(): User {
    const user: User | undefined = this.getOptionalUser();
    if (!user) throw new Error(); // TODO add specific error
    return user;
  }
}
