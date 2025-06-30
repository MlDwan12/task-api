import { Repository, FindManyOptions, ObjectLiteral } from 'typeorm';
import { PaginatedResult } from '../interface/pagination.interface';

export class PaginationHelper {
  static async paginate<T extends ObjectLiteral>(
    repo: Repository<T>,
    page = 1,
    limit = 10,
    options?: FindManyOptions<T>,
  ): Promise<PaginatedResult<T>> {
    const [data, total] = await repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      ...options,
    });

    return {
      items: data,
      total,
      page,
      limit,
    };
  }
}
