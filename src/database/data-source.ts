import { typeOrmConfig } from 'src/config/ormconfig';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource(typeOrmConfig);
