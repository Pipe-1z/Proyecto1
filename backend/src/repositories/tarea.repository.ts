import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Tarea, TareaRelations} from '../models';

export class TareaRepository extends DefaultCrudRepository<
  Tarea,
  typeof Tarea.prototype._id,
  TareaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Tarea, dataSource);
  }
}
