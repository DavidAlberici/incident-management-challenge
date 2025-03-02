import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, user } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { LoggerService } from '../../logger/services/logger.service';
import { NotificationDialogService } from '../../notification-dialog/services/notification-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public user$: Observable<any>;
  private auth = inject(Auth);
  private logger: LoggerService = inject(LoggerService)
  private notificationDialogService: NotificationDialogService = inject(NotificationDialogService)

  constructor() {
    this.user$ = user(this.auth);
  }

  public async signWithGoogle(): Promise<boolean> {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(this.auth, provider);
      return true;
    } catch (error) {
      let reason = (error as any)?.message ?? error ?? "Unknown"
      let fullMsg = 'Error during Google sign:' + reason
      this.logger.error(fullMsg)
      this.notificationDialogService.notifyError(fullMsg)
      return false;
    }
  }

  public async signInWithEmail(email: string, password: string): Promise<boolean> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      return true;
    } catch (error) {
      let reason = (error as any)?.message ?? error ?? "Unknown"
      let fullMsg = 'Error during email sign in:' + reason
      this.logger.error(fullMsg)
      this.notificationDialogService.notifyError(fullMsg)
      return false;
    }
  }

  public async signUpWithEmail(email: string, password: string): Promise<boolean> {
    try {
      await createUserWithEmailAndPassword(
        this.auth, email, password);
        return true;
    } catch (error) {
      let reason = (error as any)?.message ?? error ?? "Unknown"
      let fullMsg = 'Error during email sign up:' + reason
      this.logger.error(fullMsg)
      this.notificationDialogService.notifyError(fullMsg)
      return false;
    }
  }

  public async signOut() {
    await signOut(this.auth)
  }
}
