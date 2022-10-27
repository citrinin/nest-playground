import { Tenant } from '@app/core/tenant.entity';
import { User } from '@app/core/user.entity';
import { Injectable } from '@nestjs/common';

import { AuthPort, RegisterArgs } from './auth.port';
import { ContextProvider } from './context.provider';
import { Tokens } from './model/tokens.model';
import { AuthService } from './service/auth.service';
import { TokenService } from './service/token.service';

@Injectable()
export class AuthFacade implements AuthPort {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly context: ContextProvider
  ) {}

  async validate(email: string, password: string): Promise<User> {
    return this.authService.validate(email, password);
  }

  async register({ email, password, roleId }: RegisterArgs): Promise<Tokens> {
    const tenant: Tenant | undefined = this.context.getOptionalTenant();
    const role: string | undefined = roleId ? 'admin' : undefined;
    return this.authService.register({ email, password, role, tenant });
  }

  async login(): Promise<Tokens> {
    return this.tokenService.create(this.context.getUser());
  }

  async refreshToken(token: string): Promise<Tokens> {
    return this.authService.refreshToken(token);
  }
}
