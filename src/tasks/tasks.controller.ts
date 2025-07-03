import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationQueryDto } from './dto/get-task-query.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskResponseDto } from './dto/task-response.dto';
import { PaginatedTasksDto } from './dto/paginated-tasks.dto';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Создать новую задачу' })
  @ApiResponse({
    status: 201,
    description: 'Задача создана',
    type: TaskResponseDto,
  })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @ApiOperation({ summary: 'Получение списка задач с пагинацией' })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
    default: 1,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    default: 10,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Задачи получены',
    type: PaginatedTasksDto,
  })
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.tasksService.findAll(paginationQuery);
  }

  @ApiOperation({ summary: 'Получить информацию по задаче' })
  @ApiResponse({
    status: 200,
    description: 'Получена информация по конкретной задаче',
    type: TaskResponseDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @ApiOperation({ summary: 'Внести изменения в задачу' })
  @ApiResponse({ status: 201, description: 'Задача обновлена' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @ApiOperation({ summary: 'Удалить задачу' })
  @ApiResponse({ status: 201, description: 'Задача удалена' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
