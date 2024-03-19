import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IPagination } from '../../models/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() pagination: IPagination | undefined = undefined;
  @Output() selectedPage: EventEmitter<number> = new EventEmitter();

  onPageSelected(type: string) {
    if(type === 'next') {
      if(this.pagination?.hasNextPage) {
        this.selectedPage.next(this.pagination.selectedPage + 1);
      } else {
        return;
      }
    } else {
      if(this.pagination?.hasPreviousPage) {
        this.selectedPage.next(this.pagination.selectedPage - 1);
      } else {
        return;
      }
    }
  }
}
