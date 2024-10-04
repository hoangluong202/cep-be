import { Module } from '@nestjs/common';
import { SmartpoleSeedService } from './smartpole-seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmartPoleEntity } from 'src/smartpole/infrastructure/relational/entities/smartpole.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SmartPoleEntity])],
  providers: [SmartpoleSeedService],
  exports: [SmartpoleSeedService],
})
export class SmartpoleSeedModule {}
