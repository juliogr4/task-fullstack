import { TaskService } from './../../service/task.service';
import { AfterViewInit, Component, Inject, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-task-layout',
  templateUrl: './task-layout.component.html',
  styleUrls: ['./task-layout.component.css']
})
export class TaskLayoutComponent {

  taskService = inject(TaskService);
  isHomePage: boolean = false;

  constructor(private router: Router) {
    this.router.events
    .pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      console.log(event.url)
      this.isHomePage = event.url === '/tasks' || event.url ==="/"
    });
  }
}
