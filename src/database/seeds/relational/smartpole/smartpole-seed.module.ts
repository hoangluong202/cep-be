import { Module } from '@nestjs/common';
import { SmartPoleSeedService } from './smartpole-seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmartPoleEntity } from '../../../../smartpole/infrastructure/relational/entities/smartpole.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SmartPoleEntity])],
  providers: [SmartPoleSeedService],
  exports: [SmartPoleSeedService],
})
export class SmartPoleSeedModule {}
