import { ApiProperty } from '@nestjs/swagger';
import { SmartPole } from '../domain/smartpole';

export class TPoint {
  @ApiProperty({ type: Number })
  lat: number;

  @ApiProperty({ type: Number })
  lng: number;
}

export class SmartPoleResponseDto {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  areaKey: string;

  @ApiProperty({ type: TPoint })
  position: TPoint;

  @ApiProperty({ type: Boolean })
  status: boolean;

  @ApiProperty({ type: Number })
  dimming: number;

  @ApiProperty({ type: Number })
  burningDuration: number;

  @ApiProperty({ type: Number })
  frequency: number;

  @ApiProperty({ type: String })
  groupKey?: string;

  @ApiProperty({ type: Number })
  current?: number;

  @ApiProperty({ type: Number })
  voltage?: number;

  @ApiProperty({ type: Number })
  power?: number;

  constructor(smartPole: SmartPole) {
    this.id = smartPole.id;
    this.position = { lat: smartPole.latitude, lng: smartPole.longitude };
    this.status = smartPole.status;
    this.dimming = smartPole.dimming;
    this.burningDuration = smartPole.burningDuration;
    this.frequency = smartPole.frequency;
    this.current = smartPole.current;
    this.voltage = smartPole.voltage;
    this.power = smartPole.power;

    if (smartPole.locations) {
      this.areaKey = smartPole.locations[0].areaKey;
      if (smartPole.locations[0].groupKey) {
        this.groupKey = smartPole.locations[0].groupKey;
      }
    }
  }
}
