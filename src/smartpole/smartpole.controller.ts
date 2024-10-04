import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { SmartPoleService } from './smartpole.service';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { SmartPole } from './domain/smartpole';

@ApiTags('SmartPole')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('smartpoles')
export class SmartPoleController {
  constructor(private readonly poleService: SmartPoleService) {}

  @Get(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: SmartPole['id']): Promise<SmartPole> {
    return this.poleService.findById(id);
  }
}
