import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthFacade } from './auth.facade';
import { AuthPort } from './auth.port';
import { ClaimsFactory } from './claims.factory';
import { AuthService } from './service/auth.service';
import { HashService } from './service/hash.service';
import { TokenService } from './service/token.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [
    AuthService,
    ClaimsFactory,
    HashService,
    TokenService,
    AuthFacade,
    { provide: AuthPort, useClass: AuthFacade },
  ],
  exports: [AuthPort],
})
export class AuthCoreModule {}
