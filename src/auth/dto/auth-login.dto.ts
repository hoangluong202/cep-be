import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({ example: 'luong.hoang' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @MinLength(6)
  password: string;
}
