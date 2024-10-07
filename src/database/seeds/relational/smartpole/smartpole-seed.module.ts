import { Module } from '@nestjs/common';
import { SmartPoleSeedService } from './smartpole-seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmartPoleEntity } from '../../../../smartpole/infrastructure/relational/entities/smartpole.entity';
import { LocationEntity } from '../../../../location/infrastructure/relational/entities/location.entity';
import { UserEntity } from '../../../../user/infrastructure/relational/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SmartPoleEntity, LocationEntity, UserEntity]),
  ],
  providers: [SmartPoleSeedService],
  exports: [SmartPoleSeedService],
})
export class SmartPoleSeedModule {}
