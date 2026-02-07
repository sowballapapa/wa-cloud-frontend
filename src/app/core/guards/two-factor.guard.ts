import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const twoFactorGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const { userId } = authService.get2faInfo();

  if (userId) {
    return true;
  }

  // If no 2FA info, redirect back to login
  return router.parseUrl('/login');
};
