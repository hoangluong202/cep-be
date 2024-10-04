import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ type: 'string', example: 'Giờ Trái Đất' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example:
      'DTSTART:20240101T000000Z\nRRULE:FREQ=DAILY;INTERVAL=3;UNTIL=20240210T000000Z',
  })
  @IsNotEmpty()
  @IsString()
  rule: string;
}
