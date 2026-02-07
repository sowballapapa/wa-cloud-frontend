import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestLayoutComponent } from './components/layouts/guest-layout/guest-layout';
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout';
import { twoFactorGuard } from '../core/guards/two-factor.guard';

const routes: Routes = [
  {
    path: '',
    component: GuestLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./components/pages/guest/home/home').then(m => m.HomeComponent)
      },
      {
        path: 'hosting',
        children: [
          { path: '', redirectTo: 'ssd', pathMatch: 'full' },
          { path: 'hdd', loadComponent: () => import('./components/pages/guest/hosting/hdd/hdd').then(m => m.Hdd) },
          { path: 'ssd', loadComponent: () => import('./components/pages/guest/hosting/ssd/ssd').then(m => m.Ssd) }
        ]
      },
      {
        path: 'domains',
        children: [
          { path: '', redirectTo: 'new', pathMatch: 'full' },
          { path: 'new', loadComponent: () => import('./components/pages/guest/domains/new/new').then(m => m.New) },
          { path: 'transfer', loadComponent: () => import('./components/pages/guest/domains/transfer/transfer').then(m => m.Transfer) }
        ]
      },
      {
        path: 'solutions',
        loadComponent: () => import('./components/pages/guest/solutions/solutions').then(m => m.SolutionsComponent)
      },
      {
        path: 'about',
        loadComponent: () => import('./components/pages/guest/about/about').then(m => m.AboutComponent)
      },
      {
        path: 'faq',
        loadComponent: () => import('./components/pages/guest/faq/faq').then(m => m.FaqComponent)
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./components/pages/customers/dashboard/dashboard').then(m => m.Dashboard)
      }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./components/pages/auth/login/login').then(m => m.LoginComponent)
      },
      {
        path: 'verify-2fa',
        canActivate: [twoFactorGuard],
        loadComponent: () => import('./components/pages/auth/verify-2fa/verify-2fa').then(m => m.Verify2faComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./components/pages/auth/register/register').then(m => m.RegisterComponent)
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./components/pages/auth/forgot-password/forgot-password').then(m => m.ForgotPasswordComponent)
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./components/pages/auth/reset-password/reset-password').then(m => m.ResetPasswordComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }
