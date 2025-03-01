import { Routes } from '@angular/router';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';

export const routes: Routes = [  
   { path: '', component: SigninComponent },
   { path: 'signin', component: SigninComponent },
   { path: 'signup', component: SignupComponent }
];
