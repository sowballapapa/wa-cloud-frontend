import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft, lucideRefreshCw } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { AuthService } from '../../../../../core/services/auth-service';

@Component({
  selector: 'app-verify-2fa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NgIcon, HlmButton, HlmInput],
  providers: [provideIcons({ lucideArrowLeft, lucideRefreshCw })],
  templateUrl: './verify-2fa.html',
})
export class Verify2faComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  email = signal<string>('');
  isLoading = signal<boolean>(false);
  isResending = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  verifyForm = this.fb.group({
    code: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
  });

  constructor() {
    const info = this.authService.get2faInfo();
    if (info.email) {
      this.email.set(info.email);
    }
  }

  onSubmit() {
    if (this.verifyForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);
      const code = this.verifyForm.value.code!;

      this.authService.verify2fa(code).subscribe({
        next: (response) => {
          this.isLoading.set(false);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isLoading.set(false);
          this.errorMessage.set(error.error?.message || 'Code de vérification invalide ou expiré');
        }
      });
    }
  }

  resendCode() {
    this.isResending.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    this.authService.resend2faCode().subscribe({
      next: () => {
        this.isResending.set(false);
        this.successMessage.set('Nouveau code envoyé !');
      },
      error: (error) => {
        this.isResending.set(false);
        this.errorMessage.set('Erreur lors de l\'envoi du code');
      }
    });
  }
}
