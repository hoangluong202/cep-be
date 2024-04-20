import { Module } from '@nestjs/common';
import { SmartpoleSeedModule } from './smartpole/smartpole-seed.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from 'src/database/config/typeorm';

@Module({
  imports: [
    SmartpoleSeedModule,
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
