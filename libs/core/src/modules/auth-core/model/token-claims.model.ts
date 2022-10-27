export class TokenClaims {
  constructor(public sub: string, public email: string, public role: string, public permissions: string[]) {}
}
