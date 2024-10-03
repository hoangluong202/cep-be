import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('secrets/cert.key'),
    cert: fs.readFileSync('secrets/cert.crt'),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*', // Allow all origins
    credentials: false,
  });
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      schemes: ['https'],
    },
  });
  await app.listen(3003);
  console.log('Server running on https://localhost:3003/docs');
}
bootstrap();
