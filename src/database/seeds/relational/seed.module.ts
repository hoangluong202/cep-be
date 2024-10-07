import { Module } from '@nestjs/common';
import { SmartPoleSeedModule } from './smartpole/smartpole-seed.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from 'src/database/typeorm-config.service';
import databaseConfig from 'src/database/config/database-config';

@Module({
  imports: [
    SmartPoleSeedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
})
export class SeedModule {}
