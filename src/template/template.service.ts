import { Injectable } from '@nestjs/common';
import { Template } from './domain/template';
import { NullableType } from 'src/utils/types/nullable.type';
import { TemplateRepository } from './infrustructure/template.repository';

@Injectable()
export class TemplateService {
  constructor(private readonly templateRepository: TemplateRepository) {}

  findById(id: number): Promise<NullableType<Template>> {
    return this.templateRepository.findById(id);
  }
}
