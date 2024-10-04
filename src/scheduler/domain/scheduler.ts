import { ApiProperty } from '@nestjs/swagger';

export class Scheduler {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Date })
  executionTime: Date;

  @ApiProperty({ type: String })
  area: string;

  @ApiProperty({ type: Number })
  poleId: number;

  @ApiProperty({ type: Number })
  dimming: number;
}
