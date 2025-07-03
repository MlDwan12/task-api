import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Inject,
  Logger,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './repository/task.repository';
import { PaginationQueryDto } from './dto/get-task-query.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { plainToInstance } from 'class-transformer';
import { ClientProxy } from '@nestjs/microservices';
import { TaskStatus } from 'src/common/enums/task-status.enum';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly taskRepo: TaskRepository,
    @Inject('TASK_SERVICE') private readonly taskClient: ClientProxy,
  ) {}

  async create(dto: CreateTaskDto): Promise<TaskResponseDto> {
    try {
      const newTask = await this.taskRepo.create({
        ...dto,
      });

      this.taskClient.emit('task_created', {
        id: newTask.id,
        action: 'process',
      });

      this.logger.log(`Task created: ${newTask.id}`);

      return plainToInstance(TaskResponseDto, newTask, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      this.logger.error(`Failed to create task: ${error.message}`);
      throw new InternalServerErrorException('Не удалось создать задачу');
    }
  }

  async startProcessing(taskId: string) {
    const updated = await this.taskRepo.update(taskId, {
      status: TaskStatus.PROCESSING,
      startedAt: new Date(),
    });

    if (!updated) {
      throw new NotFoundException(`Задача с id ${taskId} не найдена`);
    }

    this.logger.log(`Task processing started: ${taskId}`);
    return updated;
  }

  async completeProcessing(taskId: string) {
    const updated = await this.taskRepo.update(taskId, {
      status: TaskStatus.COMPLETED,
      completedAt: new Date(),
    });

    if (!updated) {
      throw new NotFoundException(`Задача с id ${taskId} не найдена`);
    }

    this.logger.log(`Task completed: ${taskId}`);
    return updated;
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    try {
      return await this.taskRepo.findAllPaginated(paginationQuery);
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при получении задач');
    }
  }

  async findOne(id: string) {
    const task = await this.taskRepo.findById(id);
    if (!task) throw new NotFoundException(`Задача с id ${id} не найдена`);

    return task;
  }

  async update(id: string, dto: UpdateTaskDto) {
    const updated = await this.taskRepo.update(id, dto);
    if (!updated) throw new NotFoundException(`Задача с id ${id} не найдена`);

    return updated;
  }

  async remove(id: string) {
    const task = await this.taskRepo.findById(id);
    if (!task) throw new NotFoundException(`Задача с id ${id} не найдена`);

    try {
      await this.taskRepo.delete(id);
      return { message: 'Задача успешно удалена' };
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при удалении задачи');
    }
  }
}
