import { ApiProperty } from '@nestjs/swagger';
import { AreaResponseDto } from './area-response.dto';
import { Location } from '../domain/location';

export class GroupResponseDto extends AreaResponseDto {
  @ApiProperty({ type: 'string' })
  groupKey: string;

  @ApiProperty({ type: 'string' })
  groupName: string;

  constructor(location: Location) {
    super(location);
    this.groupKey = location.groupKey;
    this.groupName = location.groupName;
  }
}
