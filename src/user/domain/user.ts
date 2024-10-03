import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ type: 'number' })
  id: number;

  @ApiProperty({ type: 'string' })
  username: string;

  @ApiProperty({ type: 'string' })
  password?: string;
}
