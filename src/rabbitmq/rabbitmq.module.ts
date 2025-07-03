import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { rabbitConfig } from 'src/config/rabbit.config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TASK_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [rabbitConfig.uri],
          queue: rabbitConfig.queue,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class RabbitMQModule {}
