import { Module } from '@nestjs/common';
import { MqttConnect } from './config/mqtt.provider';
import { MqttService } from './mqtt.service';

@Module({
  providers: [MqttService, MqttConnect],
  exports: [MqttService],
})
export class MqttModule {}
