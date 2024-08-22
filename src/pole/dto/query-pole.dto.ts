import { ApiProperty } from '@nestjs/swagger';

export class FilterPoleDto {
  @ApiProperty({ type: String, example: 'all' })
  area: string;

  @ApiProperty({ type: String, example: 'all' })
  status: string;
}
