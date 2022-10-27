import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';

import { SuccessResponseDto } from '@app/api/dto/success-response.dto';
import { Tokens } from '@app/core/modules/auth-core/model/tokens.model';

import { Public } from './decorator/public.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';
import { TokensResponseDto } from './dto/tokens-response.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthPort } from '@app/core/modules/auth-core/auth.port';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authPort: AuthPort) {}

  @Post('register')
  async register(@Body() { email, password, roleId }: RegisterDto): Promise<TokensResponseDto> {
    const tokens: Tokens = await this.authPort.register({ email, password, roleId });
    return new TokensResponseDto(tokens);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(): Promise<TokensResponseDto> {
    const tokens: Tokens = await this.authPort.login();
    return new TokensResponseDto(tokens);
  }

  /**
   * TODO
   * Temporary solution for NbAuth.
   * Should be removed later.
   */
  @Delete('logout')
  logout(): SuccessResponseDto {
    return new SuccessResponseDto();
  }

  @Post('refresh-token')
  async refreshToken(@Body() { token }: RefreshTokenDto): Promise<TokensResponseDto> {
    const tokens: Tokens = await this.authPort.refreshToken(token.refresh_token);
    return new TokensResponseDto(tokens);
  }

  @Get('me')
  me(): string {
    return 'hello';
  }
}
