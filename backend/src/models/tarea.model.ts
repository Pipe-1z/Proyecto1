import {Entity, model, property} from '@loopback/repository';

@model()
export class Tarea extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  titulo: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @property({
    type: 'string',
    required: true,
  })
  categoria: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;


  constructor(data?: Partial<Tarea>) {
    super(data);
  }
}

export interface TareaRelations {
  // describe navigational properties here
}

export type TareaWithRelations = Tarea & TareaRelations;
