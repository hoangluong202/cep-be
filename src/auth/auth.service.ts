import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth-login.dto';
import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userService.findByUsername(loginDto.username);

    if (user?.password !== loginDto.password) {
      throw new UnauthorizedException('Username or password is incorrect');
    }

    const payload = { userId: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
