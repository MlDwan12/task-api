import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../entities/task.entity';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { PaginatedResult } from 'src/common/interface/pagination.interface';
import { PaginationHelper } from 'src/common/utils/pagination';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly repo: Repository<Task>,
  ) {}

  async create(dto: CreateTaskDto): Promise<Task> {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async findById(id: string): Promise<Task | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findAllPaginated({
    page = 1,
    limit = 10,
  }): Promise<PaginatedResult<Task>> {
    return PaginationHelper.paginate(this.repo, page, limit);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async update(id: string, dto: Partial<UpdateTaskDto>): Promise<Task | null> {
    const task = await this.findById(id);
    if (!task) return null;

    Object.assign(task, dto);
    return this.repo.save(task);
  }
}
