import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmAvatar, HlmAvatarImage, HlmAvatarFallback } from '@spartan-ng/helm/avatar';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import {
  HlmSheet,
  HlmSheetContent,
  HlmSheetHeader,
  HlmSheetTitle,
  HlmSheetDescription,
  HlmSheetFooter,
  HlmSheetTrigger
} from '@spartan-ng/helm/sheet';
import { provideIcons } from '@ng-icons/core';
import { lucideShoppingCart, lucideMenu, lucideX, lucideUser } from '@ng-icons/lucide';
import { BrnSheetImports } from '@spartan-ng/brain/sheet';
import { AuthService } from '../../../../core/services/auth-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HlmButton,
    HlmAvatar,
    HlmAvatarFallback,
    HlmIconImports,
    HlmSheet,
    HlmSheetContent,
    HlmSheetHeader,
    HlmSheetTitle,
    HlmSheetDescription,
    HlmSheetFooter,
    HlmSheetTrigger,
    BrnSheetImports
  ],
  providers: [provideIcons({ lucideShoppingCart, lucideMenu, lucideX, lucideUser })],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  authService = inject(AuthService);

  navItems = [
    { label: 'Accueil', path: '/' },
    { label: 'Hébergement', path: '/hosting' },
    { label: 'Domaines', path: '/domains' },
    { label: 'Solution WA-CLOUD', path: '/solutions' },
    { label: 'A Propos', path: '/about' },
    { label: 'FAQ', path: '/faq' },
  ];

  logout() {
    this.authService.logout();
  }
}
