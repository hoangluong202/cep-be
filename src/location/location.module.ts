import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { RelationalLocationPersistenceModule } from './infrastructure/relational/relational-persistence.module';

@Module({
  imports: [RelationalLocationPersistenceModule],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService, RelationalLocationPersistenceModule],
})
export class LocationModule {}
