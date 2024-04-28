import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSchedulerDto {
  @ApiProperty({ example: 5 })
  calendarId: number;

  @ApiProperty({ example: 'HCMUT-CS1' })
  area: string;

  @ApiPropertyOptional({ example: 'Road 1' })
  road?: string | null;

  @ApiPropertyOptional({ example: 128 })
  poleId?: number | null;

  @ApiProperty({
    example:
      'DTSTART:20240101T000000Z\nRRULE:FREQ=DAILY;INTERVAL=3;UNTIL=20240210T000000Z',
  })
  rule: string;
}
