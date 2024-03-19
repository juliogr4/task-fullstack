import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, takeUntil, tap, } from 'rxjs';
import { searchParameters } from '../../models/search-parameters';
import { Unsub } from 'src/app/shared/utils/Unsub';

@Component({
  selector: 'app-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.css']
})

export class TaskSearchComponent extends Unsub implements AfterViewInit, OnInit {
  @ViewChild("searchInput") searchInput: ElementRef | undefined;
  isDialogOpened: boolean = false;
  searchParameters: searchParameters = { sortOrder: 'ascending', taskStatus: "", searchText: "", selectedPage: 1 };
  @Output() search: EventEmitter<searchParameters> = new EventEmitter<searchParameters>();

  ngOnInit(): void { this.onSearch(); }

  onSearch() { this.search.emit(this.searchParameters); }

  onSortChange(sortOrder: string) { this.searchParameters.sortOrder = sortOrder; }

  onTaskStatusChange(taskSelected: string, inputElement: any) {
    const taskStatus: string = this.searchParameters.taskStatus.toLowerCase();
    const isTaskSelectedChecked: boolean = (inputElement as HTMLInputElement).checked;

    if (taskStatus === "") {
      this.searchParameters.taskStatus = taskSelected === 'active' ? 'inactive' : 'active';
    } else if (taskStatus === 'active') {
      this.searchParameters.taskStatus = isTaskSelectedChecked ? "" : 'inactive'
    } else if(taskStatus === 'inactive') {
      this.searchParameters.taskStatus = isTaskSelectedChecked ? "" : 'active'
    }
  }

  ngAfterViewInit(): void {
    if(!this.searchInput) return;
    const keyUpEvent$ = fromEvent<Event>(this.searchInput.nativeElement, "keyup");
    keyUpEvent$.pipe(
      map((event: Event) => (event.target as HTMLInputElement).value.trim()),
      tap(text => this.searchParameters.searchText = text),
      debounceTime(700),
      distinctUntilChanged(),
      takeUntil(this.unsubscribe$),
      tap(() => this.onSearch()),
    ).subscribe()
  }

  onApply() {
    this.toggleDialog();
    this.onSearch();
  }

  toggleDialog() { this.isDialogOpened = !this.isDialogOpened; }
}
