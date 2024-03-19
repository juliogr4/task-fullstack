import { searchParameters } from './../models/search-parameters';
import { ITaskItem } from './../models/task';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, delay, tap, throwError } from 'rxjs';
import { ITask } from '../models/task';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private readonly BASE_URL = "https://localhost:7264/api/Task";
  private readonly httpHeaders = new HttpHeaders().set('content-type', 'application/json');
  http = inject(HttpClient);

  private taskChangedSubject = new BehaviorSubject<boolean>(false);
  taskChanged$ = this.taskChangedSubject.asObservable();

  private notifyTaskChanged() { this.taskChangedSubject.next(!this.taskChangedSubject.getValue()) }

  getTasks(searchParameters: searchParameters, selectedPage: number = 1): Observable<ITask> {
    var parameters = new HttpParams();
    for(const [key, value] of Object.entries(searchParameters)) {
      if(!!value) parameters = parameters.append(key, value)
    }
    return this.http.get<ITask>(this.BASE_URL, { params: parameters })
      .pipe(
        delay(500),
        catchError((error) => this.handleError(error))
      );
  };

  updateTask(id: number, name: string): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/${id}`, JSON.stringify(name), { headers: this.httpHeaders }).pipe(
      delay(500),
      tap(() => this.notifyTaskChanged()),
      catchError((error) => this.handleError(error))
    );
  };

  deleteTask(id: number) {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`, { headers: this.httpHeaders })
    .pipe(
      delay(500),
      tap(() => this.notifyTaskChanged()),
      catchError((error) => this.handleError(error))
    );
  }

  updateTaskStatus(id: number): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/status/${id}`, null, { headers: this.httpHeaders })
    .pipe(
      delay(500),
      tap(() => this.notifyTaskChanged()),
      catchError((error) => this.handleError(error))
    );
  };

  getTaskByID(id: string): Observable<ITaskItem> {
    return this.http.get<ITaskItem>(`${this.BASE_URL}/${id}`).pipe(
      delay(500),
      catchError(error => this.handleError(error))
    );
  };

  createTask(name: string): Observable<void> {
    return this.http.post<void>(this.BASE_URL, JSON.stringify(name), {headers: this.httpHeaders}).pipe(
      delay(500),
      tap(() => this.notifyTaskChanged()),
      catchError((error) => this.handleError(error))
    );
  };

  handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  };
}
