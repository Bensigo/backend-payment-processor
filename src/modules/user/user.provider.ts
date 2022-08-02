import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { UserEntity } from '@modules/user/entities/user.entity';
import { DATABASE_CONNECTION } from '@core/config/constants';

export const USER_PROVIDER = 'USER_PROVIDER';

export const UserProvider: Provider[] = [
  {
    provide: USER_PROVIDER,
    useFactory: (connection: Connection) =>
      connection.getRepository(UserEntity),
    inject: [DATABASE_CONNECTION],
  },
];
