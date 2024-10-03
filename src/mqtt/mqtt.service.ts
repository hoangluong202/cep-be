import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import mqtt from 'mqtt';
import { InjectMqtt } from './config/mqtt.decorator';

@Injectable()
export class MqttService {
  constructor(@InjectMqtt() private client: mqtt.MqttClient) {
    this.listener();
    this.subscribe();
  }

  private async subscribe(topic = 'huy_tran/feeds/dimming') {
    try {
      this.client.subscribe(topic);
    } catch (e) {
      throw new HttpException(
        'Error subscribing to topic',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async listener() {
    this.client.on('message', (topic, message) => {
      console.log('Message received', topic, message.toString());
      this.client.end();
    });
  }

  async publish(topic: string, dimming: number) {
    const dimmingData = {
      'smartpole-1': dimming,
    };
    const data = JSON.stringify({
      value: JSON.stringify(dimmingData),
    });
    this.client.publish(topic, data);
  }
}
