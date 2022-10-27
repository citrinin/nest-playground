import { User } from '@app/core/user.entity';
import { Injectable } from '@nestjs/common';

import { TokenClaims } from './model/token-claims.model';

@Injectable()
export class ClaimsFactory {
  async create(user: User): Promise<TokenClaims> {
    const role: string = this.getRole(user);
    const permissions: string[] = await this.getPermissions(user);
    return new TokenClaims(user.id, user.email, role, permissions);
  }

  private async getPermissions(user: User): Promise<string[]> {
    let permissions: string[];
    if (user.admin) {
      permissions = await this.getAllPermissions();
    } else {
      permissions = this.extractPermissions(user);
    }
    return permissions;
  }

  private async getAllPermissions(): Promise<string[]> {
    return [];
  }

  private extractPermissions(user: User): string[] {
    return [];
  }

  private getRole(user: User): string {
    return 'admin';
  }
}
