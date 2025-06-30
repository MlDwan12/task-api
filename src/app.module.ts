import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/ormconfig';
import { HealthController } from './health/health.controller';
import { HealthService } from './health/health.service';
import { HealthModule } from './health/health.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { rabbitConfig } from './config/rabbit.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: () => typeOrmConfig,
    }),
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
    TasksModule,
    HealthModule,
  ],
  controllers: [HealthController],
  providers: [RabbitmqService, HealthService],
})
export class AppModule {}
