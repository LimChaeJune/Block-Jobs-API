import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/setupSwagger';

async function bootstrap() {
  try {
    Logger.log(process.env.PORT);
    Logger.log(process.env.DB_HOST);
    Logger.log(process.env.DB_PORT);
    Logger.log(process.env.DB_USER);
    Logger.log(process.env.DB_PASSWORD);
    Logger.log(process.env.DB_NAME);
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug'],
    });

    setupSwagger(app);
    app.enableCors();
    await app.listen(process.env.PORT || 3000);
  } catch (error) {
    Logger.log(process.env.PORT);
    Logger.log(process.env.DB_HOST);
    Logger.log(process.env.DB_PORT);
    Logger.log(process.env.DB_USER);
    Logger.log(process.env.DB_PASSWORD);
    Logger.log(process.env.DB_NAME);
    Logger.error(error);
  }
}
bootstrap();
