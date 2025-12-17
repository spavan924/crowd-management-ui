import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Dashboard } from './dashboard/dashboard';
import { overview } from './dashboard/overview/overview';
import { Entries } from './entries/entries';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },

  {
    path: '',
    component: Dashboard,     // Layout
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: overview },
      { path: 'entries', component: Entries }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
