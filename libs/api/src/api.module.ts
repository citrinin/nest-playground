import { ModuleMetadata } from '@nestjs/common';
import { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { AuthApiModule } from './modules/auth-api/auth-api.module';

@Module({})
export class ApiModule {
  static register(imports: ModuleMetadata['imports'] = []): DynamicModule {
    return {
      module: ApiModule,
      imports: [AuthApiModule.forApi(imports)],
    };
  }
}
