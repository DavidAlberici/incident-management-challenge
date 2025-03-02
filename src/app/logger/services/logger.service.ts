import { inject, Injectable } from '@angular/core';
import { NotificationDialogService } from '../../notification-dialog/services/notification-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  notificationDialogService: NotificationDialogService = inject(NotificationDialogService);

  public error(log: string, userMessage?: string) {
    console.error(log)
    this.showNotification(userMessage, "error")
  }

  public warning(log: string, userMessage?: string) {
    console.warn(log)
    this.showNotification(userMessage, "warning")
  }
  
  public log(log: string) {
    console.log(log)
  }

  private showNotification(userNotificationMessage?: string, userNotificationType?: string) {
    if (userNotificationMessage != undefined) {
      this.notificationDialogService.showNotification(userNotificationMessage, userNotificationType)
    }
  }
}
