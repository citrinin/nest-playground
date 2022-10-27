import { User } from '@app/core/user.entity';
import { Tokens } from './model/tokens.model';

export interface RegisterArgs {
  email: string;
  password: string;
  roleId?: string;
}

export abstract class AuthPort {
  abstract validate(email: string, password: string): Promise<User>;
  abstract register({ email, password, roleId }: RegisterArgs): Promise<Tokens>;
  abstract login(): Promise<Tokens>;
  abstract refreshToken(token: string): Promise<Tokens>;
}
