import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Express, Request, Response } from 'express';

const server = express();
let bootstrapPromise: Promise<void> | null = null;

const createNestServer = async (expressInstance: Express) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  app.enableCors({
    origin:
      process.env.CORS_ORIGIN?.split(',').map((origin) => origin.trim()) ||
      true,
    credentials: true,
  });
  await app.init();
};

bootstrapPromise = createNestServer(server);

export default async function handler(req: Request, res: Response) {
  await bootstrapPromise;
  return server(req, res);
}
