import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButton } from '@spartan-ng/helm/button';
import { Router } from '@angular/router';
import { ErrorService } from '../../../../services/error.service';

@Component({
  selector: 'app-error403',
  standalone: true,
  imports: [CommonModule, HlmButton],
  templateUrl: './error403.html',
  styleUrl: './error403.css',
})
export class Error403Component {
  errorService = inject(ErrorService);
  router = inject(Router);

  goHome() {
    this.errorService.clearError();
    this.router.navigate(['/']);
  }
}
