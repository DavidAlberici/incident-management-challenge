import { Component, inject } from '@angular/core';
import { Router, RouterLink  } from '@angular/router';
import { AuthenticationService } from '../../authentication/services/authentication.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private authService: AuthenticationService = inject(AuthenticationService)
  private router: Router = inject(Router)

  signOut() {
    this.authService.signOut();
    this.router.navigate([""])
  }
}
