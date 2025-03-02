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

  public notifySuccess(message: string) {
    this.notify(message, "success")
  }

  public notifyError(message: string) {
    this.notify(message, "error")
  }

  public notifyWarning(message: string) {
    this.notify(message, "warning")
  }

  public notifyInfo(message: string) {
    this.notify(message, "info")
  }

  public clearNotification() {
    this.notify(undefined, undefined)
  }

  private notify(message: string | undefined, type: string | undefined) {
    this.notificationMessageSource.next(message)
    this.notificationTypeSource.next(type)
  }
}
