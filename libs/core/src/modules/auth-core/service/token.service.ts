import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { instanceToPlain, plainToClass } from 'class-transformer';

import { TokenClaims } from '../model/token-claims.model';
import { Tokens } from '../model/tokens.model';
import { ClaimsFactory } from '../claims.factory';
import { User } from '@app/core/user.entity';

export const config: any = {
  accessTokenSecret: 'test',
  refreshTokenSecret: 'test',
  accessTokenValidity: 60000,
  refreshTokenValidity: 3600,
};

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService, private readonly claimsFactory: ClaimsFactory) {}

  async create(user: User): Promise<Tokens> {
    const claims: TokenClaims = await this.claimsFactory.create(user);
    const accessToken: string = await this.createJwt(claims, config.accessTokenSecret, config.accessTokenValidity);
    const refreshToken: string = await this.createJwt(claims, config.refreshTokenSecret, config.refreshTokenValidity);
    const expiresIn: number = this.getExpiration(config.accessTokenValidity);

    return new Tokens(accessToken, refreshToken, expiresIn);
  }

  decodeRefreshToken(refreshToken: string): TokenClaims {
    const secret: string = Math.random().toString();
    return plainToClass(TokenClaims, this.jwtService.verify<Record<string, any>>(refreshToken, { secret }));
  }

  private async createJwt(claims: TokenClaims, secret: string, expiresIn: number): Promise<string> {
    return this.jwtService.sign(instanceToPlain(claims), { secret, expiresIn });
  }

  private getExpiration(expiresIn: number): number {
    return Math.floor(Date.now() / 1000) + expiresIn;
  }
}
