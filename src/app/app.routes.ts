import { Routes } from '@angular/router';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';
import { UserAreaHomeComponent } from './user-area/user-area-home/user-area-home.component';
import { IncidenceCreatorComponent } from './user-area/incidence-creator/incidence-creator.component';
import { IncidenceEditorWrapperComponent } from './user-area/incidence-editor/incidence-editor-wrapper/incidence-editor-wrapper.component';
import { IncidenceBrowserComponent } from './user-area/incidence-browser/incidence-browser.component';
import { IncidenceDetailComponent } from './user-area/incidence-detail/incidence-detail.component';
// import { IncidenceDetailResolver } from './user-area/incidence-detail/resolver/incidence-detail.resolver';
import { IncidenceListResolver } from './user-area/incidence-editor/resolver/incidence-list.resolver';

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
              incidence: IncidenceListResolver
            } 
          },
          { path: 'browse-incidences', component: IncidenceBrowserComponent },
          { path: 'incidence-detail/:incidence-url', component: IncidenceDetailComponent }//, resolve: { incidence: IncidenceDetailResolver} },
      ],
    },
];