import {
  Controller,
  Get,
  HttpStatus,
  HttpCode,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './../auth/auth.guard';
import { User } from './domain/user';
import { NullableType } from './../utils/types/nullable.type';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: String, required: true })
  findOne(@Param('id') id: User['id']): Promise<NullableType<User>> {
    return this.userService.findById(id);
  }
}
