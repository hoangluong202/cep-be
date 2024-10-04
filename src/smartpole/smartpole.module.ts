import { Module } from '@nestjs/common';
import { SmartPoleService } from './smartpole.service';
import { SmartPoleController } from './smartpole.controller';
import { RelationalSmartPolePersistenceModule } from './infrastructure/relational/relational-persistence.module';

@Module({
  imports: [RelationalSmartPolePersistenceModule],
  controllers: [SmartPoleController],
  providers: [SmartPoleService],
  exports: [SmartPoleService, RelationalSmartPolePersistenceModule],
})
export class SmartPoleModule {}
