import { ConfigService } from '@nestjs/config';
import { MQTT_TOKEN } from './mqtt.constant';
import mqtt from 'mqtt';

let conn: mqtt.MqttClient;

export const MqttConnect = {
  inject: [ConfigService],
  provide: MQTT_TOKEN,
  useFactory: async (configService: ConfigService) => {
    conn = mqtt.connect(configService.get('MQTT_HOST'), {
      username: configService.get('MQTT_USERNAME'),
      password: configService.get('MQTT_PASSWORD'),
    });
    return conn;
  },
};
