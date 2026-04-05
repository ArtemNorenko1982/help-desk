import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, of } from 'rxjs';
import { HttpService } from '../../../lib/services/http.service';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '../../../lib/models/auth.models';
import { V1_API_ROUTES } from '../../../lib/constants/v1.api.routes';
import { AuthStateService } from '@shared-ui';

// TODO:
// 1. Interceptor for auth token management and error handling
//    catch 401 and redirect to Login page
// 2. Add Auth HTTP Headers
// 3. Add guard to protect routes
// 4. Role base

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpService = inject(HttpService);
  private readonly authStateService = inject(AuthStateService);

  get isLoggedIn(): boolean {
    return !!this.authStateService.currentUser;
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.httpService
      .post<AuthResponse>(`${V1_API_ROUTES.AUTH.LOGIN}`, credentials)
      .pipe(tap((response) => this.persistUser(response)));
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.httpService
      .post<AuthResponse>(`${V1_API_ROUTES.AUTH.REGISTER}`, data)
      .pipe(tap((response) => this.persistUser(response)));
  }

  logout(): void {
    this.authStateService.logout();
  }

  getToken(): string | null {
    const storedUser = this.authStateService.loadStoredUser();
    return storedUser?.token || null;
  }

  getMe(): Observable<AuthResponse> {
    return this.httpService.get<AuthResponse>(`${V1_API_ROUTES.AUTH.ME}`);
  }

  restoreSession(): Observable<AuthResponse | null> {
    return this.getMe().pipe(
      tap((response) => {
        this.persistUser(response);
        this.authStateService.setInitialized(true);
      }),
      catchError(() => {
        this.authStateService.logout();
        this.authStateService.setInitialized(true);
        return of(null);
      })
    );
  }

  private persistUser(response: AuthResponse): void {
    this.authStateService.setCurrentUser(response);
  }
}
