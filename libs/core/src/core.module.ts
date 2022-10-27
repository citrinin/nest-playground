import { Global, Module } from '@nestjs/common';
import { AuthCoreModule } from './modules/auth-core/auth-core.module';

@Global()
@Module({
  imports: [AuthCoreModule],
  exports: [AuthCoreModule],
})
export class CoreModule {}
