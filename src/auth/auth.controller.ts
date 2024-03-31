import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './dto/create-auth.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './guard/jwt-guard';
// import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  signup(@Body() userDTO: CreateUserDto) {
    return this.userService.create(userDTO);
  }

  @Post('login')
  login(@Body() loginDto: LoginDTO): any {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(JwtGuard)
  getProfile(@Req() request) {
    return request.user;
  }
}
