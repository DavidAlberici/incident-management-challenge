import { Routes } from '@angular/router';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';
import { UserAreaHomeComponent } from './user-area/user-area-home/user-area-home.component';
import { IncidenceCreatorComponent } from './user-area/incidence-creator/incidence-creator.component';
import { IncidenceEditorWrapperComponent } from './user-area/incidence-editor/incidence-editor-wrapper/incidence-editor-wrapper.component';
import { IncidenceResolver } from './user-area/incidence-editor/resolver/incidence.resolver';

export const routes: Routes = [
   { path: '', component: SigninComponent },
   { path: 'sign-in', component: SigninComponent },
   { path: 'sign-up', component: SignupComponent },
   {
      path: 'user-area',
      canActivate: [AuthenticationGuard],
      children: [
          { path: '', component: UserAreaHomeComponent },
          { path: 'create-incidence', component: IncidenceCreatorComponent },
          { path: 'edit-incidence/:incidence-url', 
            component: IncidenceEditorWrapperComponent,
            resolve: {
                    incidence: IncidenceResolver
                } 
            }
      ],
    },
];