import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { LoggerService } from '../../logger/services/logger.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private logger: LoggerService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authService.user$.pipe(
      take(1), // Take only the latest value and complete the observable
      map((user) => {
        if (state.url === '/sign-up' || state.url === '/sign-in') {
          return true;
        }

        if (!user) {
          this.logger.log("User is not authenticated, redirecting to root");
          return this.router.createUrlTree(['']);
        }

        return true;
      })
    );
  }
}