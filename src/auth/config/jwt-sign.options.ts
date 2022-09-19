import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import {
  JWT_ACCESS_TOKEN_EXPIRATION,
  JWT_ACCESS_TOKEN_SECRET,
} from '../constants';

@Injectable()
export class AccessTokenOptions implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get<string>(JWT_ACCESS_TOKEN_SECRET),
      signOptions: {
        expiresIn: `${this.configService.get(JWT_ACCESS_TOKEN_EXPIRATION)}s`,
      },
    };
  }
}