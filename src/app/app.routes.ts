import { Routes } from '@angular/router';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';

export const routes: Routes = [
   { path: 'sign-in', component: SigninComponent },
   { path: 'sign-up', component: SignupComponent },
   { path: '', component: SigninComponent },
   { path: 'home', component: UserHomeComponent, canActivate: [AuthenticationGuard] }
];