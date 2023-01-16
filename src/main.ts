import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/exceptions/exceptions.filter';
import { LoggingInterceptor } from './common/logger/logger.interceptor';
import { LoggerService } from './common/logger/logger.service';
import { ResponseInterceptor } from './common/response/response.interceptor';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Second hand shopping example')
    .setDescription('Simple Example')
    .setVersion('1.0')
    .addTag('shopping')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);


  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(port, () => {
    console.log('[API]', `http://localhost:${port}`);
  });
}

bootstrap();