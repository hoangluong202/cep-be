import { Module } from '@nestjs/common';
import { SmartpoleSeedService } from './smartpole-seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmartpoleEntity } from 'src/smartpole/infrastructure/relational/entities/smartpole.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SmartpoleEntity])],
  providers: [SmartpoleSeedService],
  exports: [SmartpoleSeedService],
})
export class SmartpoleSeedModule {}
