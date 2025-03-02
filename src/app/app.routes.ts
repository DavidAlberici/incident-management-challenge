import { Routes } from '@angular/router';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';
import { UserAreaHomeComponent } from './user-area/user-area-home/user-area-home.component';

export const routes: Routes = [
   { path: 'sign-in', component: SigninComponent },
   { path: 'sign-up', component: SignupComponent },
   { path: '', component: SigninComponent },
   { path: 'user-area', component: UserAreaHomeComponent, canActivate: [AuthenticationGuard] }
];