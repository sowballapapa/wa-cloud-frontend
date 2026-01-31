import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HlmButton,
    HlmInput
  ],
  templateUrl: './reset-password.html',
})
export class ResetPasswordComponent {
  private fb = inject(FormBuilder);

  resetForm = this.fb.group({
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  onSubmit() {
    if (this.resetForm.valid) {
      console.log('Reset password data', this.resetForm.value);
    }
  }
}
