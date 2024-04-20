import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmartpoleEntity } from './infrastructure/relational/entities/smartpole.entity';
import { SmartpoleRepository } from './infrastructure/relational/repositories/smartpole.repository';
import { SmartpoleService } from './smartpole.service';
import { SmartpoleController } from './smartpole.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SmartpoleEntity])],
  controllers: [SmartpoleController],
  providers: [SmartpoleService, SmartpoleRepository],
  exports: [SmartpoleService],
})
export class SmartpoleModule {}
