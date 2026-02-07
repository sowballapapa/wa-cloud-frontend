import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButton } from '@spartan-ng/helm/button';
import { Router } from '@angular/router';
import { ErrorService } from '../../../../services/error.service';

@Component({
  selector: 'app-error404',
  standalone: true,
  imports: [CommonModule, HlmButton],
  templateUrl: './error404.html',
  styleUrl: './error404.css',
})
export class Error404Component {
  errorService = inject(ErrorService);
  router = inject(Router);

  goHome() {
    this.errorService.clearError();
    this.router.navigate(['/']);
  }
}
