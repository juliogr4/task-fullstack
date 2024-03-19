import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskLayoutComponent } from './pages/task-layout/task-layout.component';
import { TaskManagerComponent } from './pages/task-manager/task-manager.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TaskSearchComponent } from './components/task-search/task-search.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TaskListComponent } from './components/task-list/task-list.component';

@NgModule({
  declarations: [
    TaskLayoutComponent,
    TaskManagerComponent,
    PaginationComponent,
    TaskSearchComponent,
    TasksComponent,
    TaskListComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TaskModule { }
