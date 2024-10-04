import { Module } from '@nestjs/common';
import { SmartPoleService } from './smartpole.service';
import { SmartPoleController } from './smartpole.controller';
import { RelationalPersistenceModule } from './infrastructure/relational/relational-persistence.module';

@Module({
  imports: [RelationalPersistenceModule],
  controllers: [SmartPoleController],
  providers: [SmartPoleService],
  exports: [SmartPoleService, RelationalPersistenceModule],
})
export class SmartPoleModule {}
