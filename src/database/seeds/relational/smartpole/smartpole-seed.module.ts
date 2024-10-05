import { Module } from '@nestjs/common';
import { SmartPoleSeedService } from './smartpole-seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmartPoleEntity } from '../../../../smartpole/infrastructure/relational/entities/smartpole.entity';
import { LocationEntity } from '../../../../location/infrastructure/relational/entities/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SmartPoleEntity, LocationEntity])],
  providers: [SmartPoleSeedService],
  exports: [SmartPoleSeedService],
})
export class SmartPoleSeedModule {}
