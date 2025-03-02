import { NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NotificationDialogService } from './notification-dialog/services/notification-dialog.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './authentication/services/authentication.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  public notificationMessage: string | undefined;
  public notificationType: string | undefined;
  private notificationMessageSubscription!: Subscription;
  private notificationTypeSubscription!: Subscription;
  private notificationDialogService: NotificationDialogService = inject(NotificationDialogService)
  private authService: AuthenticationService = inject(AuthenticationService)
  private router: Router = inject(Router)

  public closeNotificationDialog(): void {
    this.notificationDialogService.clearNotification()
  }

  signOut() {
    this.authService.signOut();
    this.router.navigate([""])
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
