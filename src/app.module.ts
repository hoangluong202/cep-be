import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/config/typeorm';
import { SmartPoleModule } from './smartpole/smartpole.module';
import { EventModule } from './event/event.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { MqttModule } from './mqtt/mqtt.module';
import { JwtModule } from '@nestjs/jwt';
import { TemplateModule } from './template/template.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
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
