import { ApiProperty } from '@nestjs/swagger';
import { Location } from '../../location/domain/location';

export class SmartPole {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  latitude: number;

  @ApiProperty({ type: Number })
  longitude: number;

  @ApiProperty({ type: Boolean })
  status: boolean;

  @ApiProperty({ type: Number })
  dimming: number;

  @ApiProperty({ type: Number })
  frequency: number;

  @ApiProperty({ type: Number })
  burningDuration: number;

  @ApiProperty({ type: Number })
  voltage: number;

  @ApiProperty({ type: Number })
  current: number;

  @ApiProperty({ type: Number })
  power: number;

  @ApiProperty({ type: Location, isArray: true })
  locations?: Location[];
}
