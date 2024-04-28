import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { PoleService } from './pole.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Pole } from './domain/pole';
import { FilterPoleDto } from './dto/query-pole.dto';

@ApiTags('Pole')
@Controller('poles')
export class PoleController {
  constructor(private readonly poleService: PoleService) {}

  @Get(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: Pole['id']): Promise<Pole> {
    return this.poleService.findById(id);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  async findMany(@Query() query: FilterPoleDto): Promise<Pole[]> {
    console.log(query);
    return this.poleService.findMany({ filterOptions: query });
  }
}
