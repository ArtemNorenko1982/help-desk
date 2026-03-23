import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../..';
import { V1_API_ROUTES } from '../../lib/constants/v1.api.routes';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.getToken();
  const router = inject(Router);

  const isAuthRequest =
    req.url.includes(V1_API_ROUTES.AUTH.LOGIN) ||
    req.url.includes(V1_API_ROUTES.AUTH.REGISTER) ||
    req.url.includes(V1_API_ROUTES.AUTH.ME);

  if (isAuthRequest) {
    return next(req);
  }

  if (!authToken) {
    return next(req);
  }

  const authRequest =
    !isAuthRequest && authToken
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${authToken}`,
          },
        })
      : req;

  return next(authRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isAuthRequest) {
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
