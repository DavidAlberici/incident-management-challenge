import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, user } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { LoggerService } from '../../logger/services/logger.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public user$: Observable<any>;
  private auth = inject(Auth);
  private logger: LoggerService = inject(LoggerService)

  constructor() {
    this.user$ = user(this.auth);
  }

  public async signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(this.auth, provider);
    } catch (error) {
      let errorMessage = (error as any)?.message ?? error ?? "Unknown"
      this.logger.error('Error during Google sign in:' + errorMessage, 'Error during Google sign in:' + errorMessage)
    }
  }

  public async signInWithEmail(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      let errorMessage = (error as any)?.message ?? error ?? "Unknown"
      this.logger.error('Error during email sign in:' + errorMessage, 'Error during email sign in:' + errorMessage)
    }
  }

  public async signUpWithEmail(email: string, password: string): Promise<void> {
    try {
      await createUserWithEmailAndPassword(
        this.auth, email, password);
    } catch (error) {
      let errorMessage = (error as any)?.message ?? error ?? "Unknown"
      this.logger.error('Error during email sign up:' + errorMessage, 'Error during email sign up:' + errorMessage)
    }
  }
}
