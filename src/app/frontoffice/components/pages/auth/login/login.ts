import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideGithub, lucideEye, lucideEyeOff, lucideRefreshCw, lucideArrowLeft } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { AuthService } from '../../../../../core/services/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NgIcon, HlmButton, HlmInput],
  providers: [provideIcons({ lucideGithub, lucideEye, lucideEyeOff, lucideRefreshCw, lucideArrowLeft })],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  showPassword = false;
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);
      const credentials = this.loginForm.value;

      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.isLoading.set(false);
          const data = response.data;
          console.log(data)
          if (data.requires_2fa) {
            this.router.navigate(['/verify-2fa']);
          } else if (data.token) {
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          this.isLoading.set(false);
          this.errorMessage.set(error.error?.message || 'Identifiants invalides');
        }
      });
    }
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
}
