import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signin',
  imports: [RouterLink, NgIf, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  public errorMessage: string = "";
  public signInForm: FormGroup;
  public isLoading: boolean = false;
  private authService = inject(AuthenticationService);
  private router = inject(Router)

  constructor(private fb: FormBuilder) {
    this.signInForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  public async signInWithEmail(): Promise<void> {
    this.isLoading = true;
    if (!this.isFormValid()) {
      this.isLoading = false;
      return;
    }

    let signed: boolean = await this.authService.signInWithEmail(this.signInForm.value.email, this.signInForm.value.password)
    if (signed) {
      this.navigateToUserHome();
    }
    this.isLoading = false;
  }

  public async signInWithGoogle() {
    let signed: boolean = await this.authService.signWithGoogle();
    if (signed) {
      this.navigateToUserHome();
    }
  }

  private isFormValid(): boolean {
    this.errorMessage = "";
    let addToErrorMessage = (s: string) => this.errorMessage += (this.errorMessage != "" ? ", " : "") + s;
    if (this.signInForm.controls['email'].invalid) {
      addToErrorMessage("Invalid email");
    } else if (this.signInForm.invalid) {
      addToErrorMessage("Please fill email and password correctly");
    }
    return this.errorMessage == "";
  }

  private navigateToUserHome() {
    this.router.navigate(['/home']);
  }
}
