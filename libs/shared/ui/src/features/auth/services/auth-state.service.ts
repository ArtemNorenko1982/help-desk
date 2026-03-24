import { Injectable } from '@angular/core';
import { AuthResponse } from '../../..';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private readonly userSubject = new BehaviorSubject<AuthResponse | null>(null);
  private readonly initializedSubject = new BehaviorSubject<boolean>(false);

  readonly currentUser$ = this.userSubject.asObservable();
  readonly isInitialized$ = this.initializedSubject.asObservable();

  readonly isAuthenticated$ = this.currentUser$.pipe(
    map((user: AuthResponse | null) => !!user)
  );

  get currentUser(): AuthResponse | null {
    return this.userSubject.getValue();
  }

  get isInitialized(): boolean {
    return this.initializedSubject.getValue();
  }

  setCurrentUser(user: AuthResponse | null): void {
    this.userSubject.next(user);
    console.log('User state updated:', user);
  }

  setInitialized(initialized: boolean): void {
    this.initializedSubject.next(initialized);
  }

  logout(): void {
    this.userSubject.next(null);
    this.initializedSubject.next(true);
  }

  private loadStoredUser(): AuthResponse | null {
    let storedUser: AuthResponse | null = null;
    this.currentUser$.subscribe((user) => (storedUser = user)).unsubscribe();
    if (!storedUser) return null;

    if (new Date((storedUser as AuthResponse).expiresAt) <= new Date()) {
      this.logout();
      return null;
    }
    return storedUser;
  }
}
