import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';
import validationOptions from './utils/validation-options';

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

  app.useGlobalPipes(new ValidationPipe(validationOptions));

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
  await app.listen(process.env.APP_PORT || 3000);
  console.log(`Server running on ${process.env.BACKEND_DOMAIN}/docs`);
}
void bootstrap();
