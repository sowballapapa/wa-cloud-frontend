import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { provideIcons } from '@ng-icons/core';
import { lucideFacebook, lucideYoutube, lucideLinkedin, lucideInstagram, lucideSend } from '@ng-icons/lucide';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, HlmButton, HlmInput, HlmIconImports],
  providers: [provideIcons({ lucideFacebook, lucideYoutube, lucideLinkedin, lucideInstagram, lucideSend })],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
