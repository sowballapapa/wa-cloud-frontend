import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HlmButton, HlmInput],
  templateUrl: './newsletter.html',
  styleUrls: ['./newsletter.css']
})
export class NewsletterComponent {
  private fb = inject(FormBuilder);

  newsletterForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  subscribe() {
    if (this.newsletterForm.valid) {
      console.log('Newsletter subscription:', this.newsletterForm.value.email);
      // Logic to call API would go here
      this.newsletterForm.reset();
    }
  }
}
