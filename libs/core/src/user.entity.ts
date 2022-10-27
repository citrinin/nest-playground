import { BaseEntity } from './base.entity';
import { Tenant } from './tenant.entity';

export class User extends BaseEntity {
  email: string;

  password: string;

  admin?: boolean = false;

  role?: string | null;

  tenant?: Tenant;

  checkRole(): void {
    if (!this.admin && !this.role) {
      throw new Error('role is not provided');
    }
  }
}
