import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterPoleDto {
  @ApiPropertyOptional({ type: String })
  area?: string | null;

  @ApiPropertyOptional({ type: String })
  road?: string | null;

  @ApiPropertyOptional({ type: Number })
  poleId?: number | null;
}
