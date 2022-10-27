import { Type } from 'class-transformer';
import { IsJWT, IsNumber, ValidateNested } from 'class-validator';

export class TokenDto {
  @IsJWT()
  access_token: string;

  @IsJWT()
  refresh_token: string;

  @IsNumber()
  expires_in: number;
}

export class RefreshTokenDto {
  @ValidateNested()
  @Type(() => TokenDto)
  token: TokenDto;
}
