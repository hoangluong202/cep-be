import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/domain/user';

export class MeResponseDto {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  username: string;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
  }
}
