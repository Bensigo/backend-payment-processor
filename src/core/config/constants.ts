export const appName = process.env.APP_NAME ?? 'backend-rmg';

export const nodeEnv: string = process.env.NODE_ENV ?? 'development';
export const maxFileSizeBytes: number = 10 * 1024 * 1024;
export const tempMulterPath: string =
  process.env.TEMP_MULTER_PATH || '/tmp/rmg/.multer';
export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';
