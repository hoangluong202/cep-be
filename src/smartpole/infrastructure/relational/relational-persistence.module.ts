import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmartPoleEntity } from './entities/smartpole.entity';
import { SmartPoleRelationalRepository } from './repositories/smartpole.repository';
import { SmartPoleRepository } from '../smartpole.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SmartPoleEntity])],
  providers: [
    {
      provide: SmartPoleRepository,
      useClass: SmartPoleRelationalRepository,
    },
  ],
  exports: [SmartPoleRepository],
})
export class RelationalSmartPolePersistenceModule {}
