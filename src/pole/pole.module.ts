import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoleEntity } from './infrastructure/relational/entities/pole.entity';
import { PoleRepository } from './infrastructure/relational/repositories/pole.repository';
import { PoleService } from './pole.service';
import { PoleController } from './pole.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PoleEntity])],
  controllers: [PoleController],
  providers: [PoleService, PoleRepository],
  exports: [PoleService],
})
export class PoleModule {}
