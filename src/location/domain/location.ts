import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SmartPole } from 'src/smartpole/domain/smartpole';

export class Location {
  @ApiProperty({ type: 'number' })
  id: number;

  @ApiProperty({ type: 'string' })
  areaKey: string;

  @ApiProperty({ type: 'string' })
  areaName: string;

  @ApiProperty({ type: 'string', nullable: true })
  groupKey: string | null;

  @ApiProperty({ type: 'string', nullable: true })
  groupName: string | null;

  @ApiProperty({ type: 'number' })
  latitude: number;

  @ApiProperty({ type: 'number' })
  longitude: number;

  @ApiPropertyOptional({ type: [SmartPole] })
  smartPoles?: SmartPole[];
}
