import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideGithub } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIcon, HlmButton, HlmInput],
  providers: [provideIcons({ lucideGithub })],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);

  registerForm = this.fb.group({
    lastName: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', [Validators.required]],
    phoneCode: ['+225', [Validators.required]],
    phone: ['', [Validators.required]],
    referralCode: [''],
    acceptTerms: [false, [Validators.requiredTrue]]
  });

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
      console.log('Register:', this.registerForm.value);
      // Implement registration logic
    }
  }
}
