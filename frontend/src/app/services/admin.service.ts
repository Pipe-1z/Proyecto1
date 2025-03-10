import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskModel } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { ConfigBackendPaths } from '../config/config.backend.paths';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  urlBase:string = ConfigBackendPaths.urlBackend;

  constructor(private http: HttpClient) { }

  postTask(task: TaskModel): Observable<TaskModel> {
    return this.http.post<TaskModel>(`${this.urlBase}tarea`, {
      titulo: task.titulo,
      descripcion: task.descripcion,
      categoria: task.categoria,
      estado: task.estado
    });
  }

  getTasks(): Observable<TaskModel> {
    return this.http.get<TaskModel>(`${this.urlBase}tarea`);
  }
}
