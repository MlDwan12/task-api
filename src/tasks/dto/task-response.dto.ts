import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TaskPriority } from 'src/common/enums/task-priority.enum';
import { TaskStatus } from 'src/common/enums/task-status.enum';

export class TaskResponseDto {
  @ApiProperty({ example: 'uuid' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'Название задачи' })
  @Expose()
  title: string;

  @ApiProperty({ example: 'Описание задачи' })
  @Expose()
  description: string;

  @ApiProperty({ enum: TaskPriority, example: TaskPriority.HIGH })
  @Expose()
  priority: TaskPriority;

  @ApiProperty({ enum: TaskStatus, example: TaskStatus.PENDING })
  @Expose()
  status: TaskStatus;

  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  @Expose()
  createdAt: string;

  @ApiProperty({ example: '2024-01-01T00:05:00Z', required: false })
  @Expose()
  startedAt?: string;

  @ApiProperty({ example: '2024-01-01T00:15:00Z', required: false })
  @Expose()
  completedAt?: string;
}
