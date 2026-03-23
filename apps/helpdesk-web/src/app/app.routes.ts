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
    loadChildren: () => import('@shared-ui').then((m) => m.ticketRoutes),
  },
  { path: 'reports', component: ReportsComponent, canActivate: [authGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [authGuard] },
  { path: '', component: HomeComponent },
  { path: '**', component: ForbiddenComponent, pathMatch: 'full' },
];
