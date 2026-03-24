import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthStateService } from '@shared-ui';

export const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const authStateService = inject(AuthStateService);
  const router = inject(Router);

  if (authStateService.currentUser) {
    return true;
  }

  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: router.routerState.snapshot.url },
  });
};
