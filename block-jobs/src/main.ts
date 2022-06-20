import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/setupSwagger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug'],
    });

    setupSwagger(app);
    app.enableCors();
    await app.listen(process.env.PORT || 3000);
  } catch (error) {
    Logger.error(error.message);
  }
}
bootstrap();
