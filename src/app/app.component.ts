import { NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NotificationDialogService } from './notification-dialog/services/notification-dialog.service';
import { Subscription } from 'rxjs';
import { HeaderComponent } from './header-and-footer/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './header-and-footer/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [NgIf, HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  public notificationMessage: string | undefined;
  public notificationType: string | undefined;
  private notificationMessageSubscription!: Subscription;
  private notificationTypeSubscription!: Subscription;
  private notificationDialogService: NotificationDialogService = inject(NotificationDialogService)

  public closeNotificationDialog(): void {
    this.notificationDialogService.clearNotification()
  }
  
  ngOnInit() {
    this.notificationMessageSubscription = this.notificationDialogService.notificationMessage.subscribe(message => this.notificationMessage = message)
    this.notificationTypeSubscription = this.notificationDialogService.notificationType.subscribe(type => this.notificationType = type)
  }
  
  ngOnDestroy() {
    this.notificationMessageSubscription.unsubscribe();
    this.notificationTypeSubscription.unsubscribe();
  }
}
