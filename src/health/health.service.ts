import { Injectable } from '@nestjs/common';
import amqp from 'amqp-connection-manager';
import { ConnectionStatus } from 'src/common/enums/healtCheck.enum';
import { DataSource } from 'typeorm';

@Injectable()
export class HealthService {
  constructor(private dataSource: DataSource) {}

  async checkDatabase(): Promise<ConnectionStatus> {
    try {
      await this.dataSource.query('SELECT 1');
      return ConnectionStatus.CONNECTED;
    } catch {
      return ConnectionStatus.DISCONNECTED;
    }
  }

  async checkRabbitmq(): Promise<ConnectionStatus> {
    try {
      const connection = await amqp.connect('amqp://guest:guest@rabbitmq:5672');
      await connection.close();
      return ConnectionStatus.CONNECTED;
    } catch {
      return ConnectionStatus.DISCONNECTED;
    }
  }
}
