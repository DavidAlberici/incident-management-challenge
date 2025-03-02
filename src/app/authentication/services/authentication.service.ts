import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, user } from '@angular/fire/auth';
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

  public async signWithGoogle(): Promise<boolean> {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(this.auth, provider);
      return true;
    } catch (error) {
      let errorMessage = (error as any)?.message ?? error ?? "Unknown"
      this.logger.error('Error during Google sign in:' + errorMessage, 'Error during Google sign in:' + errorMessage)
      return false;
    }
  }

  public async signInWithEmail(email: string, password: string): Promise<boolean> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      return true;
    } catch (error) {
      let errorMessage = (error as any)?.message ?? error ?? "Unknown"
      this.logger.error('Error during email sign in:' + errorMessage, 'Error during email sign in:' + errorMessage)
      return false;
    }
  }

  public async signUpWithEmail(email: string, password: string): Promise<boolean> {
    try {
      await createUserWithEmailAndPassword(
        this.auth, email, password);
        return true;
    } catch (error) {
      let errorMessage = (error as any)?.message ?? error ?? "Unknown"
      this.logger.error('Error during email sign up:' + errorMessage, 'Error during email sign up:' + errorMessage)
      return false;
    }
  }

  public async signOut() {
    await signOut(this.auth)
  }
}
