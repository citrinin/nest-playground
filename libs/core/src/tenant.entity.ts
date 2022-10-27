import { BaseEntity } from './base.entity';
import { User } from './user.entity';

export class Tenant extends BaseEntity {
  name: string;

  domain: string;

  users?: User[];

  userIds: string[];

  parent?: Tenant | null;
}
