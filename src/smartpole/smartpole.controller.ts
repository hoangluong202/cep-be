import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { SmartpoleService } from './smartpole.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Smartpole } from './domain/smartpole';

@ApiTags('Pole')
@Controller('smartpoles')
export class SmartpoleController {
  constructor(private readonly smartpoleService: SmartpoleService) {}

  @Get(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: Smartpole['id']): Promise<Smartpole> {
    return this.smartpoleService.findById(id);
  }
}
