import { inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export function authHeader(
  token: string | null
): Record<string, string> {
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

export interface RequestOptions {
  headers?: HttpHeaders | Record<string, string | string[]>;
  params?: HttpParams | Record<string, string | number | boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly http = inject(HttpClient);

  get<T>(url: string, options?: RequestOptions): Observable<T> {
    return this.http
      .get<T>(url, options)
      .pipe(catchError(this.handleError));
  }

  post<T>(url: string, body: unknown, options?: RequestOptions): Observable<T> {
    return this.http
      .post<T>(url, body, options)
      .pipe(catchError(this.handleError));
  }

  put<T>(url: string, body: unknown, options?: RequestOptions): Observable<T> {
    return this.http
      .put<T>(url, body, options)
      .pipe(catchError(this.handleError));
  }

  patch<T>(
    url: string,
    body: unknown,
    options?: RequestOptions
  ): Observable<T> {
    return this.http
      .patch<T>(url, body, options)
      .pipe(catchError(this.handleError));
  }

  delete<T>(url: string, options?: RequestOptions): Observable<T> {
    return this.http
      .delete<T>(url, options)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message: string;

    if (error.status === 0) {
      message = `Network error: ${error.message}`;
    } else {
      message =
        error.error?.message ??
        error.error?.errorMessage ??
        error.message ??
        `Server error ${error.status}`;
    }

    return throwError(() => new Error(message));
  }
}
