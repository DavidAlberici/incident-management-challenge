import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, NgIf, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  public errorMessage: string = "";
  public signupForm: FormGroup;
  public isLoading: boolean = false;
  private auth = inject(Auth);

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.required)
    });
  }


  async signupWithEmail(): Promise<void> {
    this.isLoading = true;
    if (!this.isFormValid()) {
      this.isLoading = false;
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        this.auth, this.signupForm.value.email, this.signupForm.value.password);
    } catch (error) {
      this.errorMessage = (error as any)?.message ?? error ?? "Error"
      console.error('Error during email signup:', error);
    } finally {
      this.isLoading = false;
    }
  }

  private isFormValid(): boolean {
    this.errorMessage = "";
    let addToErrorMessage = (s: string) => this.errorMessage += (this.errorMessage != "" ? ", " : "") + s;
    if (this.signupForm.controls['email'].invalid) {
      addToErrorMessage("Invalid email");
    }
    if (this.signupForm.controls['password'].invalid) {
      addToErrorMessage("Password must be at least 6 chars long");
    }
    if (this.signupForm.value.password != this.signupForm.value.confirmPassword) {
      addToErrorMessage("Passwords must match");
    }
    return this.errorMessage == "";
  }
}
