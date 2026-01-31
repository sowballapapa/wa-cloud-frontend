import { Routes } from '@angular/router';
import { GuestLayoutComponent } from './frontoffice/components/layouts/guest-layout/guest-layout';
import { AuthLayoutComponent } from './frontoffice/components/layouts/auth-layout/auth-layout';

export const routes: Routes = [
  {
    path: '',
    component: GuestLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./frontoffice/components/pages/home/home').then(m => m.HomeComponent)
      },
      {
        path: 'solutions',
        loadComponent: () => import('./frontoffice/components/pages/solutions/solutions').then(m => m.SolutionsComponent)
      },
      {
        path: 'about',
        loadComponent: () => import('./frontoffice/components/pages/about/about').then(m => m.AboutComponent)
      },
      {
        path: 'faq',
        loadComponent: () => import('./frontoffice/components/pages/faq/faq').then(m => m.FaqComponent)
      }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./frontoffice/components/pages/login/login').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./frontoffice/components/pages/register/register').then(m => m.RegisterComponent)
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./frontoffice/components/pages/forgot-password/forgot-password').then(m => m.ForgotPasswordComponent)
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./frontoffice/components/pages/reset-password/reset-password').then(m => m.ResetPasswordComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
