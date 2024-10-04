import { Injectable } from '@nestjs/common';
import { Template } from '../domain/template';
import { NullableType } from '../../utils/types/nullable.type';

@Injectable()
export abstract class TemplateRepository {
  abstract findById(id: Template['id']): Promise<NullableType<Template>>;
}
