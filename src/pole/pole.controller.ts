import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PoleService } from './pole.service';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Pole } from './domain/pole';
import { FilterPoleDto } from './dto/query-pole.dto';
import { GetPolesDto } from './dto/get-pole.dto';
import { AuthGuard } from './../auth/auth.guard';

@ApiTags('Pole')
@ApiBearerAuth()
@Controller('poles')
export class PoleController {
  constructor(private readonly poleService: PoleService) {}

  @Get(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: Pole['id']): Promise<Pole> {
    return this.poleService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Get('')
  @HttpCode(HttpStatus.OK)
  async findMany(@Query() query: FilterPoleDto): Promise<GetPolesDto[]> {
    const poles = await this.poleService.findMany({ filterOptions: query });
    return poles.map((pole) => new GetPolesDto(pole));
  }
}
