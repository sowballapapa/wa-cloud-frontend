import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideGithub, lucideRefreshCw, lucideArrowLeft, lucideCheckCircle, lucideCircle, lucideEye, lucideEyeOff } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import {
  HlmSheet,
  HlmSheetContent,
  HlmSheetHeader,
  HlmSheetTitle,
  HlmSheetDescription,
  HlmSheetFooter,
  HlmSheetTrigger
} from '@spartan-ng/helm/sheet';
import { BrnSheetImports } from '@spartan-ng/brain/sheet';
import { AuthService } from '../../../../../core/services/auth-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    NgIcon,
    HlmButton,
    HlmInput,
    HlmSheet,
    HlmSheetContent,
    HlmSheetHeader,
    HlmSheetTitle,
    HlmSheetDescription,
    HlmSheetFooter,
    HlmSheetTrigger,
    BrnSheetImports
  ],
  providers: [provideIcons({
    lucideGithub,
    lucideRefreshCw,
    lucideArrowLeft,
    lucideCheckCircle,
    lucideCircle,
    lucideEye,
    lucideEyeOff
  })],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  showPassword = signal<boolean>(false);
  showConfirmPassword = signal<boolean>(false);
  passwordFocused = signal<boolean>(false);

  passwordRequirements = [
    { label: 'Au moins 8 caractères', regex: /.{8,}/ },
    { label: 'Majuscules et minuscules', regex: /(?=.*[a-z])(?=.*[A-Z])/ },
    { label: 'Au moins un chiffre', regex: /\d/ },
    { label: 'Au moins un symbole', regex: /[!@#$%^&*(),.?":{}|<>]/ }
  ];

  registerForm = this.fb.group({
    lastname: ['', [Validators.required]],
    firstname: ['', [Validators.required]],
    sex: ['M', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/)
    ]],
    password_confirmation: ['', [Validators.required]],
    address: [''],
    phoneCode: ['+225', [Validators.required]],
    phone: ['', [Validators.required]],
    referralCode: [''],
    acceptTerms: [false, [Validators.requiredTrue]]
  }, {
    validators: (group) => {
      const password = group.get('password')?.value;
      const confirm = group.get('password_confirmation')?.value;
      return password === confirm ? null : { mismatch: true };
    }
  });

  checkRequirement(regex: RegExp): boolean {
    const password = this.registerForm.get('password')?.value || '';
    return regex.test(password);
  }

  registerWithGitHub() {
    console.log('Register with GitHub');
    // Implement GitHub OAuth
  }

  registerWithGoogle() {
    console.log('Register with Google');
    // Implement Google OAuth
  }

  registerWithLinkedIn() {
    console.log('Register with LinkedIn');
    // Implement LinkedIn OAuth
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);
      const data = this.registerForm.value;

      this.authService.register(data).subscribe({
        next: (response) => {
          this.isLoading.set(false);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isLoading.set(false);
          this.errorMessage.set(error.error?.message || 'Une erreur est survenue lors de l\'inscription');
        }
      });
    }
  }
}
