import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'luong.hoang' })
  username: string;

  @ApiProperty({ example: 'password' })
  password: string;
}
