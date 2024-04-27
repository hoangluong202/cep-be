import { ApiProperty } from '@nestjs/swagger';

export class CreateCalendarDto {
  @ApiProperty({ example: 'Lịch của tôi' })
  name: string;

  @ApiProperty({
    example: [
      {
        startHour: '06:00',
        endHour: '18:00',
        lightLevel: 100,
      },
    ],
  })
  configLightLevel: {
    startHour: string;
    endHour: string;
    lightLevel: number;
  }[];
}
