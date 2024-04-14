import { Injectable } from '@nestjs/common';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async login(loginDto: AuthRegisterLoginDto) {
    const user = await this.userService.findByUsername(loginDto.username);
    if (user.password !== loginDto.password) {
      throw new Error('Invalid credentials');
    }
    return { id: user.id };
  }
}
