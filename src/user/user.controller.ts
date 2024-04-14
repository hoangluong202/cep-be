import { Controller, Get, HttpStatus, HttpCode, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './infrastructure/relational/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiTags('Users')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.findById(id);
  }
}
