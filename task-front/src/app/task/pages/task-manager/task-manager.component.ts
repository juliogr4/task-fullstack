import { GlobalLoaderService } from './../../../shared/service/global-loader.service';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from '../../service/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map, of, switchMap, take, tap } from 'rxjs';
import { Unsub } from 'src/app/shared/utils/Unsub';
import { ITaskItem } from '../../models/task';
import { AlertService } from 'src/app/shared/service/alert.service';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent extends Unsub implements OnInit {
  router = inject(Router);
  taskService = inject(TaskService);
  activedRoute = inject(ActivatedRoute);
  alertService = inject(AlertService);
  formBuilder = inject(FormBuilder);
  loader = inject(GlobalLoaderService)

  taskForm: FormGroup = this.formBuilder.group({
    id: [-1, Validators.required],
    name: ["", Validators.required],
    status: ["", Validators.required],
    taskAction: ["", Validators.required]
  });

  ngOnInit(): void {
    this.loader.setLoading(true);
    this.activedRoute.paramMap.pipe(
      map((params: Params) => params['get']("task-id")),
      switchMap((id: string | null) => {
        if(id) { return this.taskService.getTaskByID(id) }
        else { return of(null) };
      }),
      tap((result : ITaskItem | null) => {
        if(result) {
          this.taskForm.setValue({
            id: result.id,
            name: result.name,
            status: result.status,
            taskAction: "edit"
          });
        } else {
          this.taskForm.get("taskAction")?.setValue("create");
          this.taskForm.get("status")?.clearValidators();
        }
      }),
      take(1),
    ).subscribe({
      error: (error) => {
        this.alertService.onError("error getting the task" );
        this.loader.setLoading(false);
      },
      complete: () => { this.loader.setLoading(false); }
    })
  }

  get taskStatus() { return this.taskForm.get("status")?.value; }
  get taskAction() { return this.taskForm.get("taskAction")?.value; }

  updateTaskStatus() {
    const nextTask: string = this.taskStatus.toLowerCase() === 'active' ? 'inactive' : 'active';
    if(confirm(`convert task from ${this.taskStatus} to ${nextTask.toUpperCase()}?`)) {
      this.loader.setLoading(true);
      this.taskService.updateTaskStatus(this.taskForm.get("id")?.value).subscribe({
        next: (result) => {
          this.alertService.onSuccess("task status updated successfully");
          this.router.navigate(["/"]);
        },
        error: (error) => {
          this.loader.setLoading(false);
          this.alertService.onError("error while updating the task status" );
        },
        complete: () => { this.loader.setLoading(false); }
      });
    };
  }

  deleteTask() {
    if(confirm(`would you like to delete this task permanently?`)) {
      this.loader.setLoading(true);
      this.taskService.deleteTask(this.taskForm.get("id")?.value)
        .subscribe({
          next: (result) => {
            this.alertService.onSuccess(`task deleted successfully`);
            this.router.navigate(["/"]);
          },
          error: (error) => {
            this.loader.setLoading(false);
            this.alertService.onError(`error while deleting the task`);
          },
          complete: () => { this.loader.setLoading(false); }
        })
    }
  }

  addEditTask() {
    if (!this.taskForm.valid) {
      alert("fill out the message field");
      return;
    }

    this.loader.setLoading(true);
    const id = this.taskForm.get("id")?.value;
    const name = this.taskForm.get("name")?.value;

    let taskObservable: Observable<void>;

    this.taskAction === 'edit' ?
      taskObservable = this.taskService.updateTask(id, name):
      taskObservable = this.taskService.createTask(name);

    taskObservable.subscribe({
      next: () => {
        const action = this.taskAction === 'edit' ? 'updated' : 'created';
        this.alertService.onSuccess(`task ${action} successfully`);
        this.router.navigate(["/"]);
      },
      error: () => {
        this.loader.setLoading(false);
        const action = this.taskAction === 'edit' ? 'updating' : 'creating';
        this.alertService.onError(`error while ${action} the task`);
      },
      complete: () => { this.loader.setLoading(false); }
    });
  }
}
