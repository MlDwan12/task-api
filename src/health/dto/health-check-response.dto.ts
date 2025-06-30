import { ApiProperty } from '@nestjs/swagger';
import {
  HealthStatus,
  ConnectionStatus,
} from 'src/common/enums/healtCheck.enum';

export class HealthCheckResponse {
  @ApiProperty({ enum: HealthStatus, example: HealthStatus.OK })
  status: HealthStatus;

  @ApiProperty({ enum: ConnectionStatus, example: ConnectionStatus.CONNECTED })
  database: ConnectionStatus;

  @ApiProperty({ enum: ConnectionStatus, example: ConnectionStatus.CONNECTED })
  rabbitmq: ConnectionStatus;
}
