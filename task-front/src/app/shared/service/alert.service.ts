import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Alert } from '../models/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new BehaviorSubject<Alert | null>(null);
  alertAction$ = this.alertSubject.asObservable();

  private closeSubject = new BehaviorSubject<boolean>(true);
  closeAction$ = this.closeSubject.asObservable();

  setAlert(alert: Alert | null) {
    this.alertSubject.next(alert);
  }

  onSuccess(message: string) {
    this.setAlert({ message: message, status: 'success' });
  }

  onError(message: string) {
    this.setAlert({ message: message, status: 'error' });
  }

  closeAlert() {
    this.setAlert(null);
  }

  constructor() { }
}
