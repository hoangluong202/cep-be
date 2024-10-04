import { Template } from '../../../../template/domain/template';
import { TemplateEntity } from '../entities/template.entity';

export class TemplateMapper {
  static toDomain(raw: TemplateEntity): Template {
    const domainEntity = new Template();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.color = raw.color;
    domainEntity.dimmingSetting = raw.dimmingSetting;
    return domainEntity;
  }
}
