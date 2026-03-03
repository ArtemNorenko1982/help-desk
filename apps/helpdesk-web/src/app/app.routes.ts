import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  // { path: 'dashboard' },
  // loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)},
  {
    path: 'tickets',
    loadChildren: () => import('@shared-ui').then((m) => m.ticketRoutes),
  },
  // { path: 'reports' },
  // { path: 'settings' },
];
