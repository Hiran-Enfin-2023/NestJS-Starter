import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { authContants } from './constants/auth-contants';
import { PayloadType } from './types/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authContants.secret,
    });
  }

  async validate(payload: PayloadType) {
    return {
      userId: payload.userId,
      email: payload.email,
      artistId: payload.artistId,
    };
  }
}
