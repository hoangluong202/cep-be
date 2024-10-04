import { ApiProperty } from '@nestjs/swagger';

export class DimmingSetting {
  @ApiProperty({ type: 'string' })
  startTime: string;

  @ApiProperty({ type: 'string' })
  endTime: string;

  @ApiProperty({ type: 'number' })
  dimming: number;
}

export class Template {
  @ApiProperty({ type: 'number' })
  id: number;

  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ type: 'string' })
  color: string;

  @ApiProperty({ type: DimmingSetting })
  dimmingSetting: DimmingSetting[];
}
