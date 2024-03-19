import { Component, Input, OnInit, inject } from '@angular/core';
import { searchParameters } from '../../models/search-parameters';
import { TaskService } from '../../service/task.service';
import { ITask } from '../../models/task';
import { Observable, of, takeUntil } from 'rxjs';
import { Unsub } from 'src/app/shared/utils/Unsub';
import { AlertService } from 'src/app/shared/service/alert.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent extends Unsub implements OnInit{
  taskService = inject(TaskService);
  alertService = inject(AlertService);
  tasks: ITask = {} as ITask;
  isLoading: boolean = false;
  searchParameters: searchParameters = {} as searchParameters;
  selectedPage: number = 1;

  ngOnInit(): void {
    this.taskService.taskChanged$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe()
  }

  getTasks() {
    this.isLoading = true;
    this.taskService.getTasks(this.searchParameters)
      .subscribe({
        next: (tasks) => { this.tasks = tasks; },
        error: (error) => {
          this.isLoading = false;
          this.alertService.onError("error fetching the list");
        },
        complete: () => { this.isLoading = false }
      });
  }

  onPageSelected(selectedPage: number) {
    this.searchParameters.selectedPage = selectedPage;
    this.getTasks();
  }

  onSearch(searchParameters: searchParameters) {
    this.searchParameters.selectedPage = 1;
    this.searchParameters = searchParameters;
    this.getTasks();
  }
}
