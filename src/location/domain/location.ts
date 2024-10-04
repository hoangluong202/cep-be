import { ApiProperty } from '@nestjs/swagger';

export class Location {
  @ApiProperty({ type: 'number' })
  id: number;

  @ApiProperty({ type: 'string' })
  area: string;

  @ApiProperty({ type: 'string' })
  group: string;

  @ApiProperty({ type: 'number' })
  latitude: number;

  @ApiProperty({ type: 'number' })
  longitude: number;
}
