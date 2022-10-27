import { Global, Module, Provider } from '@nestjs/common';
import { AuthModuleOptions } from '@nestjs/passport';

const optionsProvider: Provider = {
  provide: AuthModuleOptions,
  useValue: { property: 'currentUser' },
};

@Global()
@Module({
  providers: [optionsProvider],
  exports: [optionsProvider],
})
export class AuthOptionsModule {}
