export function validateEnv(config: Record<string, unknown>) {
  return {
    APP_NAME: config.APP_NAME || 'HudaVerse',
    APP_PORT: Number(config.APP_PORT) || 3001,
    NODE_ENV: config.NODE_ENV || 'development',
  };
}