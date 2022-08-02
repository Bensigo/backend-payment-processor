import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions: any = new DocumentBuilder()
  .setTitle('WeAreCreators')
  .setDescription('APIS')
  .setVersion('0.0.2')
  .addServer('http://localhost:3047/v1', 'localhost')
  .addServer('https://wearecreator.herokuapp.com/v1', 'dev_server')
  .addServer('https://stage.wearecreator.com/v1', 'stage_server')
  .addServer('https://api.wearecreator.com/v1', 'prod_server')
  .build();