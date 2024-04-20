import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { SmartpoleSeedService } from './smartpole/smartpole-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  //run
  await app.get(SmartpoleSeedService).run();

  await app.close();
};
void runSeed();
