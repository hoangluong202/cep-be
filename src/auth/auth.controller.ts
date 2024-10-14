import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/domain/user';
import { NullableType } from 'src/utils/types/nullable.type';
import { AuthGuard } from './auth.guard';
import { LoginResponseDto } from './dto/login-response.dto';
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({
    type: LoginResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: AuthLoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('me')
  @ApiOkResponse({
    type: User,
  })
  @HttpCode(HttpStatus.OK)
  async me(@Request() req): Promise<NullableType<User>> {
    return this.authService.me(req.user);
  }
}
