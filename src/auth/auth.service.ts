import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './dto/create-auth.dto';
// import { User } from 'src/user/entities/user.entity';
// import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ArtistService } from 'src/artist/artist.service';
import { PayloadType } from './types/types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private artistService: ArtistService,
  ) {}

  async login(LoginDTO: LoginDTO): Promise<{ accessToken: string }> {
    const user = await this.userService.findUser(LoginDTO);

    if (user) {
      const passwordMatched = await bcrypt.compare(
        LoginDTO.password,
        user.password,
      );

      if (passwordMatched) {
        delete user.password;
        const payload: PayloadType = { email: user.email, userId: user.id };
        const artist = await this.artistService.findArtist(user.id);

        if (artist) {
          payload.artistId = artist.id;
        }

        return {
          accessToken: this.jwtService.sign(payload),
        };
      } else {
        throw new UnauthorizedException('Password does not match');
      }
    } else {
      throw new UnauthorizedException('User not found');
    }
  }
}
