import { Controller, Get, HttpStatus, HttpCode, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './infrastructure/relational/entities/user.entity';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: String })
  findById(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.findById(id);
  }
}
