import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  // { path: 'dashboard', component: },
  {
    path: 'tickets',
    loadChildren: () => import('@shared-ui').then((m) => m.ticketRoutes),
  },
  // { path: 'reports', component:  },
  // { path: 'settings', component:  },
  // { path: '**', component:  }
];
