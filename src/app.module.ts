import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/config/typeorm';
import { PoleModule } from './pole/pole.module';
import { CalendarModule } from './calendar/calendar.module';
import { EventModule } from './event/event.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { MqttModule } from './mqtt/mqtt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UserModule,
    AuthModule,
    PoleModule,
    CalendarModule,
    EventModule,
    SchedulerModule,
    MqttModule,
  ],
})
export class AppModule {}
