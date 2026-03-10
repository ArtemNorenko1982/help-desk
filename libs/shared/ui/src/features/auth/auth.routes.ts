import { Routes } from '@angular/router';
import { LoginShellComponent } from './login/login-shell.component';
import { LoginTabComponent } from './login/login-tab/login-tab.component';
import { RegisterTabComponent } from './login/register-tab/register-tab.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: LoginShellComponent,
    children: [
      {
        path: '',
        component: LoginTabComponent,
      },
      {
        path: 'register',
        component: RegisterTabComponent,
      },
    ],
  },
];
