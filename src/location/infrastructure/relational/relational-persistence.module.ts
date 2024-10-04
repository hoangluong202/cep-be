import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationEntity } from './entities/location.entity';
import { LocationRepository } from '../location.repository';
import { LocationRelationalRepository } from './repositories/location.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LocationEntity])],
  providers: [
    {
      provide: LocationRepository,
      useClass: LocationRelationalRepository,
    },
  ],
  exports: [LocationRepository],
})
export class RelationalLocationPersistenceModule {}
