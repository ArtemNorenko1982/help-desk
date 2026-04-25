import { Routes } from '@angular/router';
import {
  authGuard,
  HomeComponent,
  DashboardComponent,
  ReportsComponent,
  SettingsComponent,
  ForbiddenComponent,
} from '@shared-ui';

export const appRoutes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('@shared-ui').then((m) => m.authRoutes),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardComponent,
  },
  {
    path: 'tickets',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    loadChildren: () => import('@shared-ui').then((m) => m.ticketRoutes),
  },
  { path: 'users', 
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    loadChildren: () => import('@shared-ui').then((m) => m.userRoutes) },
  { path: 'reports', component: ReportsComponent, canActivate: [authGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [authGuard] },
  { path: '', component: HomeComponent },
  { path: '**', component: ForbiddenComponent, pathMatch: 'full' },
];

// 1. login component - separate form without a thing
// 2. in case user is authorised -> redirect to root page (dashboard or tickets)
