import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TaskModel } from 'src/app/models/task.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  tasks: TaskModel[] = [];
  fGroup: FormGroup = new FormGroup({});
  editGroup: FormGroup = new FormGroup({});
  isEditCardVisible: boolean = false;
  selectedTask: TaskModel | null = null;

  constructor(private adminService: AdminService, private fb: FormBuilder) {}

  ngOnInit() {
    this.ConstruirFormularios();
    this.listTasks();
  }

  ConstruirFormularios() {
    this.fGroup = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      category: ['', [Validators.required]],
      description: ['', [Validators.minLength(4)]],
    });

    this.editGroup = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      category: ['', [Validators.required]],
      description: ['', [Validators.minLength(4)]],
      status: ['', [Validators.required]],
    });
  }

  addTask() {
    if (this.fGroup.invalid) {
      return;
    }

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
      next: (datos: TaskModel) => {},
      error: (err) => {
        console.log('error');
      },
    });

    this.listTasks();
  }

  deleteTask(task: TaskModel | null) {
    if (!task) {
      return;
    }

    let id: string = task._id || '';

    this.adminService.deleteTask(id).subscribe({
      next: () => {
        const index = this.tasks.indexOf(task);
        if (index > -1) {
          this.tasks.splice(index, 1);
        }
        this.closeEditCard();
      },
      error: (err) => {
        console.log('error');
      },
    });
  }

  listTasks() {
    this.adminService.getTasks().subscribe({
      next: (datos: TaskModel[]) => {
        this.tasks = datos;
        this.fGroup.reset();
      },
      error: (err) => {
        console.log('error');
      },
    });
  }

  get ObtenerFormGroup() {
    return this.fGroup.controls;
  }

  get ObtenerEditGroup() {
    return this.editGroup.controls;
  }

  editTask(task: TaskModel) {
    this.selectedTask = task;
    this.editGroup.patchValue({
      title: task.titulo,
      category: task.categoria,
      description: task.descripcion,
      status: task.estado,
    });
    this.isEditCardVisible = true;
  }

  closeEditCard() {
    this.isEditCardVisible = false;
    this.selectedTask = null;
  }

  applyEdit() {
    if (this.editGroup.invalid || !this.selectedTask) return;

    const updatedTask = {
      ...this.selectedTask,
      titulo: this.editGroup.value.title,
      categoria: this.editGroup.value.category,
      descripcion: this.editGroup.value.description,
      estado: this.editGroup.value.status,
    };

    this.adminService.updateTask(updatedTask).subscribe({
      next: () => {
        this.closeEditCard();
        this.listTasks();
      },
      error: () => console.log('error'),
    });
  }
}
