import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DimmingSetting } from '../domain/template';

export class UpdateTemplateDto {
  @ApiPropertyOptional({ type: String, example: 'Giờ Trái Đất' })
  name?: string;

  @ApiProperty({ type: String, example: '#000000' })
  color?: string;

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
