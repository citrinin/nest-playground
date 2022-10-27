import { ApiModule } from '@app/api';
import { ApiContextProvider } from '@app/api/modules/auth-api/api-context.provider';
import { CoreModule } from '@app/core';
import { ContextProvider } from '@app/core/modules/auth-core/context.provider';
import { Scope } from '@nestjs/common';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [
    {
      provide: ContextProvider,
      useClass: ApiContextProvider,
      scope: Scope.REQUEST,
    },
  ],
  exports: [ContextProvider],
})
class ContextProviderModule {}

@Module({
  imports: [ApiModule.register([CoreModule]), ContextProviderModule],
})
export class AppModule {}
