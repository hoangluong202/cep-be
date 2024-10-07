import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsLatitude, IsLongitude, IsString } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({ type: String })
  @IsString()
  groupName: string;

  @ApiProperty({ type: Number })
  @IsLatitude()
  latitude: number;

  @ApiProperty({ type: Number })
  @IsLongitude()
  longitude: number;

  @ApiProperty({ type: [Number] })
  @IsArray()
  smartPoleIds: number[];
}
