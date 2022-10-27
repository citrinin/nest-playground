import { Tenant } from '@app/core/tenant.entity';
import { User } from '@app/core/user.entity';
import { Injectable } from '@nestjs/common';

import { TokenClaims } from '../model/token-claims.model';
import { Tokens } from '../model/tokens.model';
import { HashService } from './hash.service';
import { TokenService } from './token.service';

interface RegisterArgs {
  email: string;
  password: string;
  role?: string;
  tenant?: Tenant;
}

@Injectable()
export class AuthService {
  constructor(private readonly hashService: HashService, private readonly tokenService: TokenService) {}

  async register({ email, password, role, tenant }: RegisterArgs): Promise<Tokens> {
    const passwordHash: string = await this.hashService.hash(password);
    const user: User = { email, password: passwordHash, tenant, role } as User;
    return this.tokenService.create(user);
  }

  async validate(email: string, password: string): Promise<User> {
    const user: User = { email, password } as User;
    const passwordsMatch: boolean = await this.hashService.compare(password, user.password);

    if (!passwordsMatch) {
      throw new Error('wrong credentials');
    }

    return user;
  }

  async refreshToken(refreshToken: string): Promise<Tokens> {
    let claims: TokenClaims;

    try {
      claims = this.tokenService.decodeRefreshToken(refreshToken);
    } catch {
      throw new Error('invalid token');
    }

    const user: User = { id: claims.sub, email: claims.email } as User;
    return this.tokenService.create(user);
  }
}
