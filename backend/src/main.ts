import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";

import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";
import type { NextFunction, Request, Response } from "express";
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configuredFrontend = process.env.FRONTEND_URL?.replace(/\/$/, "");
  const allowedOrigins = new Set([
    ...(configuredFrontend ? [configuredFrontend] : []),
    ...(process.env.ALLOWED_ORIGINS ?? "").split(",").map((origin) => origin.trim().replace(/\/$/, "")).filter(Boolean),
    ...(process.env.NODE_ENV === "development" ? ["http://localhost:3000"] : []),
  ]);

  app.use(cookieParser());
  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use("/auth", (req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin;
    const mutating = ["POST", "PUT", "PATCH", "DELETE"].includes(req.method);
    if (origin && !allowedOrigins.has(origin)) {
      return res.status(403).json({ message: "Request origin is not allowed." });
    }
    if (mutating && req.headers.cookie && (!origin || !allowedOrigins.has(origin))) {
      return res.status(403).json({ message: "Request origin is required for cookie-authenticated requests." });
    }
    next();
  });

  app.enableCors({
    origin: [...allowedOrigins],
    credentials: true,
  });

  await app.listen(Number(process.env.PORT) || 3001);
}

bootstrap();
