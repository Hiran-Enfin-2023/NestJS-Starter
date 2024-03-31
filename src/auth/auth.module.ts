import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { authContants } from './constants/auth-contants';
import { JwtStrategy } from './jwt-strategy';
import { ArtistModule } from 'src/artist/artist.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: authContants.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    ArtistModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
