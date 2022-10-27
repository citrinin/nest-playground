import { TokenClaims } from '@app/core/modules/auth-core/model/token-claims.model';
import { config } from '@app/core/modules/auth-core/service/token.service';
import { User } from '@app/core/user.entity';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.accessTokenSecret,
    });
  }

  async validate(claims: TokenClaims): Promise<User> {
    try {
      return { id: claims.sub, email: claims.email } as User;
    } catch {
      throw new Error('invalid token');
    }
  }
}
