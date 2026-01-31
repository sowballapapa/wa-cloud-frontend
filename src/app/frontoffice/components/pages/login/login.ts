import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideGithub, lucideEye, lucideEyeOff } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NgIcon, HlmButton, HlmInput],
  providers: [provideIcons({ lucideGithub, lucideEye, lucideEyeOff })],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);

  showPassword = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  loginWithGitHub() {
    console.log('Login with GitHub');
    // Implement GitHub OAuth
  }

  loginWithGoogle() {
    console.log('Login with Google');
    // Implement Google OAuth
  }

  loginWithLinkedIn() {
    console.log('Login with LinkedIn');
    // Implement LinkedIn OAuth
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login:', this.loginForm.value);
      // Implement login logic
    }
  }
}
