import { registerAs } from '@nestjs/config';
import appConfig from '../config';
import { appName } from '../config/constants';

export const dbConfig = {
  url:
    process.env.PG_URL ??
    `postgresql://postgres:postgres@127.0.0.1:5432/wearecreators${
      appConfig.isTesting ? '_test' : ''
    }`,
  synchronize: true,
  migrationsTableName: `${appName}_schema_migrations`,
  type: 'postgres',
  logging: true,
  entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}'],
  migrationsRun: false,
  migrations: [__dirname + '/../../../migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: __dirname + '/../../../migrations',
  },
  // ssl: {
  //   rejectUnauthorized: false,
  // },
};

export default registerAs('database', () => {
  return dbConfig;
});
