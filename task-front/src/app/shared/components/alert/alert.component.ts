import { Component, Input, OnInit, inject } from '@angular/core';
import { Alert } from '../../models/alert';
import { AlertService } from '../../service/alert.service';
import { delay, of, switchMap, takeUntil, tap } from 'rxjs';
import { Unsub } from '../../utils/Unsub';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent extends Unsub implements OnInit {
  alert: Alert | null = null;
  alertService = inject(AlertService);

  ngOnInit(): void {
    this.alertService.alertAction$.pipe(takeUntil(this.unsubscribe$))
    .subscribe((result) => {
        this.alert = result;
        if(this.alert) {
          setTimeout(() => {
            this.onCloseAlert();
          }, 4000)
        }
      }
    )
  }

  onCloseAlert() {
    this.alertService.closeAlert();
  }
}
