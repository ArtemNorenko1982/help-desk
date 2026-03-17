import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpService } from '../../../lib/services/http.service';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '../../../lib/models/auth.models';
import {
  V1_API_ROUTES,
  AUTH_TOKEN_KEY,
} from '../../../lib/constants/v1.api.routes';

// 03/10/2026
// TODO:
// 1. Interceptor for auth token management and error handling
//    catch 401 and redirect to Login page
// 2. Add Auth HTTP Headers
// 3. Add guard to protect routes
// 4. Role base 
// ------------------------------
// 03/17/2026
// TODO: separate this service - segregate token logic
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpService = inject(HttpService);

  readonly currentUser = signal<AuthResponse | null>(this.loadStoredUser());

  get isLoggedIn(): boolean {
    return !!this.currentUser();
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
    localStorage.removeItem(AUTH_TOKEN_KEY);
    this.currentUser.set(null);
  }

  getToken(): string | null {
    return this.currentUser()?.token ?? null;
  }

  private persistUser(response: AuthResponse): void {
    localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(response));
    this.currentUser.set(response);
  }

  private loadStoredUser(): AuthResponse | null {
    try {
      const stored = localStorage.getItem(AUTH_TOKEN_KEY);
      if (!stored) return null;

      const user = JSON.parse(stored) as AuthResponse;
      if (new Date(user.expiresAt) <= new Date()) {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        return null;
      }
      return user;
    } catch {
      return null;
    }
  }
}
