import { Global, ModuleMetadata, RequestMethod } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common';
import { NestModule } from '@nestjs/common';
import { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import passport from 'passport';

import { ApiContextProvider } from './api-context.provider';
import { AuthOptionsModule } from './auth-options.module';
import { AuthController } from './auth.controller';
import { SessionTenantMiddleware } from './middleware/session-tenant.middleware';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [AuthOptionsModule, JwtModule.register({})],
  providers: [ApiContextProvider, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthApiModule implements NestModule {
  static forApi(imports: ModuleMetadata['imports'] = []): DynamicModule {
    return {
      module: AuthApiModule,
      providers: [ApiContextProvider, LocalStrategy, JwtStrategy],
      controllers: [AuthController],
      imports: [JwtModule.register({}), AuthOptionsModule, ...imports],
    };
  }

  configure(consumer: MiddlewareConsumer): void {
    console.log(passport);

    consumer.apply(SessionTenantMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
    // consumer
    //   .apply(SessionTenantMiddleware, passport.initialize({ userProperty: 'currentUser' }))
    //   .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
