import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from './dto/login-response.dto';
import { JwtPayloadType } from './strategies/types/jwt-payload';
import { MeResponseDto } from './dto/me-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: AuthLoginDto): Promise<LoginResponseDto> {
    const user = await this.userService.findByUsername(loginDto.username);
    if (user?.password !== loginDto.password) {
      throw new UnauthorizedException('Username or password is incorrect');
    }

    const payload: JwtPayloadType = { id: user.id };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async me(userJwtPayload: JwtPayloadType): Promise<MeResponseDto> {
    const me = await this.userService.findById(userJwtPayload.id);
    return new MeResponseDto(me);
  }
}
