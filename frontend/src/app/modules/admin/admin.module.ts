import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { TasksComponent } from './tasks/tasks.component';


@NgModule({
  declarations: [TasksComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
