import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  async hash(password: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(10, 'b');
    return bcrypt.hash(password, salt);
  }

  compare(original: string, hash: string): Promise<boolean> {
    return bcrypt.compare(original, hash);
  }
}
