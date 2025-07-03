import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus } from 'src/common/enums/task-status.enum';
import { IsDate, IsEnum, IsOptional } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiPropertyOptional({ enum: TaskStatus, example: TaskStatus.COMPLETED })
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
  completedAt: Date;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
  startedAt: Date;
}
