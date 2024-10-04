import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { SmartPoleSeedService } from './smartpole/smartpole-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  //run
  await app.get(SmartPoleSeedService).run();

  await app.close();
};
void runSeed();
