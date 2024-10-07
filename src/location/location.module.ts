import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { RelationalLocationPersistenceModule } from './infrastructure/relational/relational-persistence.module';
import { SmartPoleModule } from '../smartpole/smartpole.module';

@Module({
  imports: [RelationalLocationPersistenceModule, SmartPoleModule],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService, RelationalLocationPersistenceModule],
})
export class LocationModule {}
