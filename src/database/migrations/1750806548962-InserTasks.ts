import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class InserTasks1750806548962 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const statuses = ['pending', 'processing', 'completed', 'failed'];
    const priorities = ['low', 'medium', 'high'];
    const now = new Date();

    const tasks = Array.from({ length: 20 }).map((_, i) => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const priority =
        priorities[Math.floor(Math.random() * priorities.length)];

      const startedAt =
        status !== 'pending'
          ? new Date(now.getTime() + Math.floor(Math.random() * 5) * 60000)
          : null;

      const completedAt =
        status === 'completed' || status === 'failed'
          ? new Date(
              (startedAt ?? now).getTime() +
                (5 + Math.floor(Math.random() * 10)) * 60000,
            )
          : null;

      return `('${uuidv4()}', 'Задача #${i + 1}', 'Описание задачи #${i + 1}', '${priority}', '${status}', ${
        startedAt ? `'${startedAt.toISOString()}'` : 'NULL'
      }, ${completedAt ? `'${completedAt.toISOString()}'` : 'NULL'}, '${now.toISOString()}')`;
    });

    const valuesSql = tasks.join(',\n');

    await queryRunner.query(`
      INSERT INTO tasks (id, title, description, priority, status, "startedAt", "completedAt", "createdAt")
      VALUES
      ${valuesSql};
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM tasks`);
  }
}
