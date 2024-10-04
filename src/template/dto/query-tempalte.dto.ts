import { ApiProperty } from '@nestjs/swagger';
import { DimmingSetting } from '../domain/template';

export class QueryTemplateDto {
  @ApiProperty({ type: 'number', example: 1 })
  id: number;

  @ApiProperty({ type: 'string', example: 'Giờ Trái Đất' })
  name: string;

  @ApiProperty({ type: 'string', example: '#000000' })
  color: string;

  @ApiProperty({
    type: DimmingSetting,
    example: [
      {
        startTime: '06:00',
        endTime: '18:00',
        dimming: 100,
      },
    ],
  })
  dimmingSetting: DimmingSetting[];
}
