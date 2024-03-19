import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskLayoutComponent } from './pages/task-layout/task-layout.component';
import { TaskManagerComponent } from './pages/task-manager/task-manager.component';
import { TasksComponent } from './pages/tasks/tasks.component';

const routes: Routes = [
  {
    path: "", component: TaskLayoutComponent, children: [
      { path: "tasks", component: TasksComponent, title: "Tasks" },
      { path: "task-manager/:task-id", component: TaskManagerComponent, title: "Task Manager" },
      { path: "task-manager", component: TaskManagerComponent, title: "Task Manager" },
      { path: "", redirectTo: "tasks", pathMatch: "full" },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
