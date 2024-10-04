import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { TemplateService } from './template.service';
import { Template } from './domain/template';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Template')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @ApiParam({ name: 'id', type: 'number' })
  @Get(':id')
  async findById(@Param('id') id: Template['id']): Promise<Template> {
    const template = this.templateService.findById(id);
    if (!template) {
      throw new BadRequestException('Template not found');
    }
    return template;
  }
}
