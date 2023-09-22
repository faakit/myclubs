import jsonwebtoken from 'jsonwebtoken';

import { appConfigs } from '@/app/configs/appConfigs';
import { TokenType } from '@/app/enums/JWT';
import { Role } from '@/app/enums/Role';

export class JWT {
  static sign(
    payload: Record<number | string | symbol, unknown>,
    role: Role,
  ): { access_token: string; refresh_token: string } {
    const access_token = jsonwebtoken.sign(
      { ...payload, type: TokenType.AccessToken, role },
      appConfigs.secret,
      { expiresIn: appConfigs.accessTokenLifeTime },
    );

    const refresh_token = jsonwebtoken.sign(
      { type: TokenType.RefreshToken, payload: { ...payload, role } },
      appConfigs.secret,
      { expiresIn: appConfigs.refreshTokenLifeTime },
    );

    return { access_token, refresh_token };
  }

  static verify<T = string | object>(token: string): T {
    return (jsonwebtoken.verify(token, appConfigs.secret, {
      ignoreExpiration: false,
    }) as unknown) as T;
  }
}

interface TokenCommonData {
  type: TokenType;
}

export interface AccessTokenData extends TokenCommonData {
  id?: number;
  role?: Role;
  clubs?: number[];
  admin?: number[];
}

export interface RefreshTokenData extends TokenCommonData {
  payload: Record<string, unknown>;
}

export type TokenData = AccessTokenData | RefreshTokenData;
