import { Module } from '@nestjs/common';
import { SmartPoleSeedModule } from './smartpole/smartpole-seed.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from 'src/database/config/typeorm';

@Module({
  imports: [
    SmartPoleSeedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
})
export class SeedModule {}
