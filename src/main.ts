import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config_service = app.get(ConfigService)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(config_service.get('PORT'));
}
bootstrap();
