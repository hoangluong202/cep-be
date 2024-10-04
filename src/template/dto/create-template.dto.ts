import { ApiProperty } from '@nestjs/swagger';
import { DimmingSetting } from '../domain/template';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class CreateTemplateDto {
  @ApiProperty({ type: String, example: 'Giờ Trái Đất' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, example: '#000000' })
  @IsString()
  @IsNotEmpty()
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
  @IsArray()
  @ValidateNested({ each: true })
  dimmingSetting: DimmingSetting[];
}
