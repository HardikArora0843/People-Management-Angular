import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning'
}

export interface Notification {
  message: string;
  type: NotificationType;
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  notifications$ = this.notificationSubject.asObservable();
  private idCounter = 0;

  showSuccess(message: string) {
    this.show(message, NotificationType.SUCCESS);
  }

  showError(message: string) {
    this.show(message, NotificationType.ERROR);
  }

  showInfo(message: string) {
    this.show(message, NotificationType.INFO);
  }

  showWarning(message: string) {
    this.show(message, NotificationType.WARNING);
  }

  private show(message: string, type: NotificationType) {
    this.notificationSubject.next({
      message,
      type,
      id: this.idCounter++
    });
  }
}