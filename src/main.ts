import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ExcludeNullInterceptor } from '@app/utils/serialization';
import { PORT } from './constants';
import { AppLogger } from '@app/utils/loggers';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs:true
  });
  app.useLogger(app.get(AppLogger))
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ExcludeNullInterceptor());
  app.use(cookieParser());
  await app.listen(configService.get(PORT));
}
bootstrap();
