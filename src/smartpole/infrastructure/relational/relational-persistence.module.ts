import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmartPoleEntity } from './entities/smartpole.entity';
import { SmartPolesRelationalRepository } from './repositories/smartpole.repository';
import { SmartPoleRepository } from '../smartpole.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SmartPoleEntity])],
  providers: [
    {
      provide: SmartPoleRepository,
      useClass: SmartPolesRelationalRepository,
    },
  ],
  exports: [SmartPoleRepository],
})
export class RelationalSmartPolePersistenceModule {}
