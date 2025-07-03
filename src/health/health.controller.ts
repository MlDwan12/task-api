import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthService } from './health.service';
import { HealthCheckResponse } from './dto/health-check-response.dto';
import {
  ConnectionStatus,
  HealthStatus,
} from 'src/common/enums/healtCheck.enum';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Проверка статуса сервисов' })
  @ApiResponse({
    status: 200,
    description: 'Возвращает статус сервисов',
    type: HealthCheckResponse,
  })
  async check(): Promise<HealthCheckResponse> {
    const databaseStatus = await this.healthService.checkDatabase();
    const rabbitmqStatus = await this.healthService.checkRabbitmq();

    const allServicesOk =
      databaseStatus === ConnectionStatus.CONNECTED &&
      rabbitmqStatus === ConnectionStatus.CONNECTED;

    return {
      status: allServicesOk ? HealthStatus.OK : HealthStatus.ERROR,
      database: databaseStatus,
      rabbitmq: rabbitmqStatus,
    };
  }
}
