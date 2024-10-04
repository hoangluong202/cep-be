import { ApiProperty } from '@nestjs/swagger';

export class Event {
  @ApiProperty({ type: 'number' })
  id: number;

  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ type: 'string' })
  rule: string;
}
