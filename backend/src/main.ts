import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";

import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: ["http://localhost:3000"],
    credentials: true,
  });

  await app.listen(3001);
}

bootstrap();
