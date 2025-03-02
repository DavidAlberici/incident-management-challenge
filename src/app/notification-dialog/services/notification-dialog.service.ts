import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationDialogService {

  private notificationMessageSource = new BehaviorSubject<string | undefined>(undefined);
  private notificationTypeSource = new BehaviorSubject<string | undefined>(undefined);
  notificationMessage = this.notificationMessageSource.asObservable();
  notificationType = this.notificationTypeSource.asObservable();

  constructor() { }

  public showNotification(message: string | undefined, type: string | undefined) {
    this.notificationMessageSource.next(message)
    this.notificationTypeSource.next(type)
  }

  public clearNotification() {
    this.notificationMessageSource.next(undefined)
    this.notificationTypeSource.next(undefined)
  }
}
