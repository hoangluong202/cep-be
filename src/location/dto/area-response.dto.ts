import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Location } from '../domain/location';
import { SmartPole } from '../../smartpole/domain/smartpole';

export class AreaResponseDto {
  @ApiProperty({ type: 'number' })
  id: number;

  @ApiProperty({ type: 'string' })
  areaKey: string;

  @ApiProperty({ type: 'string', nullable: true })
  areaName: string | null;

  @ApiProperty({ type: 'number' })
  latitude: number;

  @ApiProperty({ type: 'number' })
  longitude: number;

  @ApiPropertyOptional({ type: [SmartPole] })
  smartPoles?: SmartPole[];

  constructor(location: Location) {
    this.id = location.id;
    this.areaKey = location.areaKey;
    this.areaName = location.areaName;
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }
}
