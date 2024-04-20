import { ApiProperty } from '@nestjs/swagger';

export class CreateCalendarDto {
  @ApiProperty({ example: 'Lịch của tôi' })
  name: string;

  @ApiProperty()
  configLightLevel: {
    startHour: string;
    endHour: string;
    lightLevel: number;
  }[];
}
