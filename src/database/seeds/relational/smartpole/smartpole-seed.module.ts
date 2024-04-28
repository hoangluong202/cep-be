import { Module } from '@nestjs/common';
import { SmartpoleSeedService } from './smartpole-seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoleEntity } from 'src/pole/infrastructure/relational/entities/pole.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PoleEntity])],
  providers: [SmartpoleSeedService],
  exports: [SmartpoleSeedService],
})
export class SmartpoleSeedModule {}
