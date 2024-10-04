import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemplateEntity } from '../entities/template.entity';
import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../utils/types/nullable.type';
import { Template } from '../../../../template/domain/template';
import { TemplateRepository } from '../../template.repository';
import { TemplateMapper } from '../mappers/template.mapper';

@Injectable()
export class TemplateRelationalRepository implements TemplateRepository {
  constructor(
    @InjectRepository(TemplateEntity)
    private repository: Repository<TemplateEntity>,
  ) {}

  async findById(id: Template['id']): Promise<NullableType<Template>> {
    const calendar = await this.repository.findOneBy({ id: id });
    return calendar ? TemplateMapper.toDomain(calendar) : null;
  }
}
