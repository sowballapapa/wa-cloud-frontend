import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButton } from '@spartan-ng/helm/button';
import { ErrorService } from '../../../../services/error.service';

@Component({
  selector: 'app-error401',
  standalone: true,
  imports: [CommonModule, HlmButton],
  templateUrl: './error401.html',
  styleUrl: './error401.css',
})
export class Error401Component {
  errorService = inject(ErrorService);

  retry() {
    this.errorService.clearError();
    window.location.reload();
  }
}
