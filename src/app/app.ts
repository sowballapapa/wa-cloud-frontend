import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorService } from './core/services/error.service';
import { Error401Component } from './core/components/pages/errors/error401/error401';
import { Error403Component } from './core/components/pages/errors/error403/error403';
import { Error404Component } from './core/components/pages/errors/error404/error404';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Error401Component, Error403Component, Error404Component],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('wa-cloud');
  errorService = inject(ErrorService);
}
