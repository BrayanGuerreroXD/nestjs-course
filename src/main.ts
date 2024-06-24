import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { CORS } from './constants/cors';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'));

  app.useGlobalPipes(new ValidationPipe({
    transformOptions: {
      enableImplicitConversion: true
    }
  }));

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  app.enableCors(CORS);

  app.setGlobalPrefix('api');
  
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
