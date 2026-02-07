import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideRefreshCw, lucideArrowLeft } from '@ng-icons/lucide';
import { AuthService } from '../../../../../core/services/auth-service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    HlmButton,
    HlmInput,
    NgIcon
  ],
  providers: [provideIcons({ lucideRefreshCw, lucideArrowLeft })],
  templateUrl: './reset-password.html',
})
export class ResetPasswordComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  token = '';
  email = '';

  resetForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    password_confirmation: ['', Validators.required]
  }, {
    validators: (group) => {
      const password = group.get('password')?.value;
      const confirm = group.get('password_confirmation')?.value;
      return password === confirm ? null : { mismatch: true };
    }
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
      this.email = params['email'] || '';

      if (!this.token || !this.email) {
        this.errorMessage.set('Lien de réinitialisation invalide ou manquant.');
      }
    });
  }

  onSubmit() {
    if (this.resetForm.valid && this.token && this.email) {
      this.isLoading.set(true);
      this.errorMessage.set(null);

      const data = {
        token: this.token,
        email: this.email,
        password: this.resetForm.value.password,
        password_confirmation: this.resetForm.value.password_confirmation
      };

      this.authService.resetPassword(data).subscribe({
        next: (response) => {
          this.isLoading.set(false);
          this.successMessage.set(response.message || 'Mot de passe réinitialisé.');
          setTimeout(() => this.router.navigate(['/login']), 3000);
        },
        error: (error) => {
          this.isLoading.set(false);
          this.errorMessage.set(error.error?.message || 'Une erreur est survenue.');
        }
      });
    }
  }
}
