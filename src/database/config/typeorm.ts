import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get<string>('PGDB_HOST'),
      port: this.config.get<number>('PGDB_PORT'),
      username: this.config.get<string>('PGDB_USER'),
      password: this.config.get<string>('PGDB_PASSWORD'),
      database: this.config.get<string>('PGDB_NAME'),
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      synchronize: true,
    };
  }
}
