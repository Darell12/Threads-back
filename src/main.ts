import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationErrorFilter } from './mongo-validation.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true, // Si necesitas admitir credenciales de navegador (por ejemplo, cookies)
  });
  app.useGlobalFilters(new ValidationErrorFilter());
  await app.listen(3000);
}
bootstrap();
