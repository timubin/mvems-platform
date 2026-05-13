import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import helmet from 'helmet';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  // Environment Validation
  const requiredEnv = ['DATABASE_URL', 'JWT_SECRET'];
  const missingEnv = requiredEnv.filter((env) => !process.env[env]);
  if (missingEnv.length > 0) {
    logger.error(`Missing required environment variables: ${missingEnv.join(', ')}`);
    process.exit(1);
  }

  const app = await NestFactory.create(AppModule);

  // Error Handling
  app.useGlobalFilters(new AllExceptionsFilter());

  // Security Hardening
  app.use(helmet());
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*', // In production, replace with specific domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Graceful Shutdown
  app.enableShutdownHooks();

  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
