import {Entity, model, property} from '@loopback/repository';
import {validate, Length} from 'class-validator';

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
  @Length(4, 255, {message: 'El título debe tener al menos 4 caracteres.'})
  titulo: string;

  @property({
    type: 'string',
  })
  @Length(4, 255, {message: 'La descripción debe tener al menos 4 caracteres.'})
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
