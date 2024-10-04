import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmartPoleEntity } from './entities/smartpole.entity';
import { SmartPolesRelationalRepository } from './repositories/smartpole.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SmartPoleEntity])],
  providers: [
    {
      provide: SmartPoleEntity,
      useClass: SmartPolesRelationalRepository,
    },
  ],
  exports: [SmartPoleEntity],
})
export class RelationalPersistenceModule {}
