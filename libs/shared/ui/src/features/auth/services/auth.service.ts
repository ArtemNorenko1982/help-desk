import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpService } from '../../../lib/services/http.service';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '../../../lib/models/auth.models';

const AUTH_TOKEN_KEY = 'hd_auth_token';
const API_BASE = '/api/v1/auth';

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
      .post<AuthResponse>(`${API_BASE}/login`, credentials)
      .pipe(tap((response) => this.persistUser(response)));
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.httpService
      .post<AuthResponse>(`${API_BASE}/register`, data)
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
