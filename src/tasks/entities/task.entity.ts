import { TaskPriority } from 'src/common/enums/task-priority.enum';
import { TaskStatus } from 'src/common/enums/task-status.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: TaskPriority })
  priority: TaskPriority;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @Column({ nullable: true })
  startedAt?: Date;

  @Column({ nullable: true })
  completedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
