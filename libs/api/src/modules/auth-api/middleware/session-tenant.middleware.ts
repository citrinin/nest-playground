import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class SessionTenantMiddleware implements NestMiddleware {
  private readonly tenantIdHeader: string = 'X-ZPR-TENANT-ID';

  constructor() {}

  async use(req: Request, _: Response, next: NextFunction): Promise<void> {
    const tenantId: string | undefined = req.header(this.tenantIdHeader);
    if (tenantId) {
      await this.addTenant(req, tenantId);
    }
    next();
  }

  private async addTenant(req: Request, tenantId: string): Promise<void> {
    try {
      req.currentTenant = `tenant-ivanovich-${tenantId}`;
    } catch {
      return;
    }
  }
}
