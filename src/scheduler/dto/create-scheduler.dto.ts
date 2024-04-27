import { ApiProperty } from '@nestjs/swagger';

export class CreateSchedulerDto {
  @ApiProperty({ example: 'hcmut1' })
  area: string;

  @ApiProperty({ example: 1 })
  poleId: number;

  @ApiProperty({ example: '2024-04-27T19:30:00.000Z' })
  time: Date;

  @ApiProperty({ example: 44 })
  lightLevel: number;
}
