import { Repository, ObjectLiteral } from 'typeorm'

export class BaseRepository<
  Entity extends ObjectLiteral
> extends Repository<Entity> {}
