import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { RelationalTemplatePersistenceModule } from './infrustructure/relational/relational-persistence.module';

@Module({
  imports: [RelationalTemplatePersistenceModule],
  controllers: [TemplateController],
  providers: [TemplateService],
  exports: [TemplateService, RelationalTemplatePersistenceModule],
})
export class TemplateModule {}
