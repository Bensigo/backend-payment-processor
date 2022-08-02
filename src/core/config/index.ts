import { appName, nodeEnv } from './constants';

const appNamePortSum: any = (appName: string): number => {
  return (
    Math.ceil(
      [...appName, ...appName.split('-').pop()].reduce(
        (sum, char) => sum + char.charCodeAt(0),
        0,
      ) / 30,
    ) + 3000
  );
};

const storageDisk: string = process.env.DISK || 'local';
const tempMediaPath: string = process.env.TEMP_MEDIA_PATH || '.tmp';
const diskStoragePath: string =
  process.env.DISK_STORAGE_PATH || '/tmp/backend-rmg';
const tempMulterPath: string =
  process.env.TEMP_MULTER_PATH || '/tmp/backend-rmg/.mutler';

export interface IAppConfig {
  name: string;
  port: number;
  isLocal: boolean;
  isTesting: boolean;
  isDevelopment: boolean;
  isProduction: boolean;
  jwtSecret: string;
  postgres: {
    url: string;
    logger: boolean;
  };
  s3: {
    bucket: string;
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
  };
  storage: {
    disk: string;
    diskPath: string;
    tempMediaPath: string;
    tempMulterPath: string;
  };
}
const isTesting: boolean = nodeEnv === 'test';
const appConfig: IAppConfig = {
  name: appName,
  port:
    typeof process.env.PORT == 'undefined'
      ? appNamePortSum(appName)
      : parseInt(process.env.PORT || '0'),
  isLocal: nodeEnv === 'local',
  isTesting,
  isDevelopment: nodeEnv === 'development',
  isProduction: nodeEnv === 'production',
  jwtSecret: process.env.JWT_SECRET || 'gfuhjlklkjhghjkjhghjk',
  postgres: {
    url: '',
    logger: nodeEnv !== 'production',
  },
  s3: {
    bucket: process.env.S3_BUCKET,
    region: process.env.S3_REGION,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
  storage: {
    disk: storageDisk,
    diskPath: diskStoragePath,
    tempMulterPath,
    tempMediaPath,
  },
};

export default appConfig;
