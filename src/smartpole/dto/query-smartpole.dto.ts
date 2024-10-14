import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { plainToInstance, Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { SmartPole } from '../domain/smartpole';

export class SortSmartPoleDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof SmartPole;

  @ApiProperty()
  @IsString()
  order: string;
}

export class FilterSmartPoleDto {
  @ApiPropertyOptional({ type: String, example: 'hcmut2' })
  @IsOptional()
  @IsString()
  areaKey?: string;

  @ApiPropertyOptional({ type: String, example: 'h1' })
  @IsOptional()
  @IsString()
  groupKey?: string;

  @ApiPropertyOptional({ type: Boolean, example: true })
  @IsOptional()
  @IsBoolean()
  status?: boolean;
}

export class PaginationSmartPoleDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : 8))
  @IsNumber()
  limit?: number;
}

export class QuerySmartPoleDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) =>
    value
      ? plainToInstance(PaginationSmartPoleDto, JSON.parse(value))
      : undefined,
  )
  @ValidateNested()
  @Type(() => PaginationSmartPoleDto)
  paginate?: PaginationSmartPoleDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterSmartPoleDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterSmartPoleDto)
  filters?: FilterSmartPoleDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(SortSmartPoleDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortSmartPoleDto)
  sorts?: SortSmartPoleDto[] | null;
}
