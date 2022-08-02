import { ConfigModule } from '@nestjs/config';
import dbConfig from './src/core/database/db.config';

ConfigModule.forRoot({
  isGlobal: true,
  load: [dbConfig],
});

export default dbConfig();
