import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { SmartPoleModule } from './smartpole/smartpole.module';
import { EventModule } from './event/event.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { MqttModule } from './mqtt/mqtt.module';
import { JwtModule } from '@nestjs/jwt';
import { TemplateModule } from './template/template.module';
import { LocationModule } from './location/location.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import databaseConfig from './database/config/database-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: ['.env'],
    }),

    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    UserModule,
    AuthModule,
    SmartPoleModule,
    TemplateModule,
    EventModule,
    SchedulerModule,
    MqttModule,
    LocationModule,
  ],
})
export class AppModule {}
