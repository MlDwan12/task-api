import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import { Channel, Connection, connect } from 'amqplib';
import { TasksService } from './tasks.service';
import { rabbitConfig } from '../config/rabbit.config';

@Injectable()
export class TasksConsumer implements OnModuleDestroy {
  private connection: Connection;
  private channel: Channel;
  private readonly logger = new Logger(TasksConsumer.name);

  constructor(private readonly tasksService: TasksService) {}

  async onModuleInit() {
    this.connection = await connect(rabbitConfig.uri);
    this.channel = await this.connection.createChannel();

    await this.channel.assertQueue(rabbitConfig.queue, { durable: true });

    this.channel.consume(
      rabbitConfig.queue,
      async (msg) => {
        if (!msg) return;

        const content = msg.content.toString();
        const task = JSON.parse(content);

        this.logger.log(`Received task: ${content}`);

        await this.tasksService.updateStatus(task.id, 'processing');

        setTimeout(
          async () => {
            await this.tasksService.updateStatus(task.id, 'completed');
            this.channel.ack(msg);
            this.logger.log(`Task ${task.id} completed`);
          },
          10 * 60 * 1000,
        );
      },
      { noAck: false },
    );

    this.logger.log('Consumer started');
  }

  async onModuleDestroy() {
    this.logger.log('Closing RabbitMQ connection');
    await this.channel?.close();
    await this.connection?.close();
  }
}
