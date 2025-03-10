import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskModel } from 'src/app/models/task.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  tasks: any[] = [];
  fGroup: FormGroup = new FormGroup({});
  constructor(private adminService: AdminService, private fb: FormBuilder) {}

  ngOnInit() {
    this.ConstruirFormulario();
  }

  ConstruirFormulario() {
    this.fGroup = this.fb.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  addTask() {
    if (this.fGroup.invalid) {
      return;
    }

    console.log(this.ObtenerFormGroup['title']);

    let title = this.ObtenerFormGroup['title'].value;
    let category = this.ObtenerFormGroup['category'].value;
    let description = this.ObtenerFormGroup['description'].value;

    const newTask = {
      titulo: title,
      categoria: category,
      descripcion: description,
      estado: 'Pendiente',
    };

    this.adminService.postTask(newTask).subscribe({
      next: (datos: TaskModel) => {
        alert(datos);
      },
      error: (err) => {
        console.log('error');
      },
    });
  }

  deleteTask(task: any) {
    const index = this.tasks.indexOf(task);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
  }
  get ObtenerFormGroup() {
    return this.fGroup.controls;
  }
}
