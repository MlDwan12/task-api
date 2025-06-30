import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { TaskPriority } from 'src/common/enums/task-priority.enum';

export class CreateTaskDto {
  @ApiProperty({ example: 'Название задачи', description: 'Название задачи' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Описание задачи',
    description: 'Описание задачи',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: TaskPriority, example: TaskPriority.HIGH })
  @IsEnum(TaskPriority)
  priority: TaskPriority;
}
