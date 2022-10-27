import { Tokens } from '@app/core/modules/auth-core/model/tokens.model';
import { IsJWT, IsNumber, ValidateNested } from 'class-validator';

export class TokensDto {
  @IsJWT()
  access_token: string;

  @IsJWT()
  refresh_token: string;

  @IsNumber()
  expires_in: number;

  constructor(tokens: Tokens) {
    this.access_token = tokens.access_token;
    this.refresh_token = tokens.refresh_token;
    this.expires_in = tokens.expires_in;
  }
}

export class TokensResponseDto {
  @ValidateNested()
  token: TokensDto;

  constructor(tokens: Tokens) {
    this.token = new TokensDto(tokens);
  }
}
