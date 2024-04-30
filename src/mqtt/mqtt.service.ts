import { Injectable } from '@nestjs/common';
import mqtt from 'mqtt';
import { InjectMqtt } from './config/mqtt.decorator';

@Injectable()
export class MqttService {
  constructor(@InjectMqtt() private client: mqtt.MqttClient) {
    this.listener();
    this.subscribe();
  }

  private async subscribe(topic: string = 'huy_tran/feeds/dimming') {
    try {
      this.client.subscribe(topic);
      const testData = {
        id: 1,
        value: 0,
      };
      const data = JSON.stringify({
        value: JSON.stringify(testData),
      });
      this.client.publish(topic, data);
    } catch (e) {
      console.log('Error subscribe', e);
    }
  }

  private async listener() {
    this.client.on('message', (topic, message) => {
      console.log('Message received', message.toString());
      this.client.end();
    });
  }

  async publish(topic: string, message: string) {
    this.client.publish(topic, message, (err) => {
      if (err) {
        console.log('Error publish', err);
      } else {
        console.log('Published');
      }
    });
  }
}
