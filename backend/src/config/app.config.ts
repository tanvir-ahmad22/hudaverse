import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME || 'HudaVerse',
  port: Number(process.env.APP_PORT) || 3001,
  environment: process.env.NODE_ENV || 'development',
}));