import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';

@Controller('health')
@ApiTags('Health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get('')
  @HealthCheck()
  check() {
    // todo: fix
    return this.health.check([
      () =>
        this.http.pingCheck(
          'db',
          process.env.PG_URL ||
            'http://postgres:postgres@127.0.0.1:5432/wearecreators',
        ),
    ]);
  }
}
