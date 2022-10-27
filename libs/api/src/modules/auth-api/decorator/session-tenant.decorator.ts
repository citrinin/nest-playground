import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

interface SessionTenantOptions {
  optional: boolean;
}

export const SessionTenant: (options?: SessionTenantOptions) => ParameterDecorator = createParamDecorator(
  ({ optional }: SessionTenantOptions = { optional: false }, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const tenant: any = request.currentTenant;
    if (!tenant && !optional) {
      throw new Error();
    }
    return request.currentTenant;
  }
);
