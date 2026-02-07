import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../interfaces/response';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
}

export interface AuthResponse {
  token?: string;
  user?: User;
  requires_2fa?: boolean;
  user_id?: string;
  email?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';
  private readonly TWO_FA_USER_ID_KEY = '2fa_user_id';
  private readonly TWO_FA_EMAIL_KEY = '2fa_email';
  private readonly API_URL = environment.apiUrl;

  // Signal to track authentication state
  isAuthenticated = signal<boolean>(false);
  currentUser = signal<User | null>(null);

  constructor(private http: HttpClient) {
    // Check authentication status on service initialization
    this.checkAuthStatus();
  }

  /**
   * Check if user is authenticated by validating token from storage
   */
  checkAuthStatus(): boolean {
    const token = this.getToken();

    if (token) {
      // Load user data
      const userData = this.getUserData();
      if (userData) {
        this.currentUser.set(userData);
        this.isAuthenticated.set(true);
        return true;
      }
    }

    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    return false;
  }

  /**
   * Get token from localStorage or sessionStorage
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Get user data from storage
   */
  getUserData(): User | null {
    const userJson = localStorage.getItem(this.USER_KEY) || sessionStorage.getItem(this.USER_KEY);

    if (userJson) {
      try {
        return JSON.parse(userJson) as User;
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }

    return null;
  }

  /**
   * Login user via API
   */
  login(credentials: any): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.API_URL}/auth/login`, credentials).pipe(
      tap(response => {
        const data = response.data;
        if (data.requires_2fa) {
          localStorage.setItem(this.TWO_FA_USER_ID_KEY, data.user_id!);
          localStorage.setItem(this.TWO_FA_EMAIL_KEY, data.email!);
        } else if (data.token) {
          this.handleAuthResponse(data);
        }
      })
    );
  }

  /**
   * Verify 2FA code
   */
  verify2fa(code: string): Observable<ApiResponse<AuthResponse>> {
    const userId = localStorage.getItem(this.TWO_FA_USER_ID_KEY);
    return this.http.post<ApiResponse<AuthResponse>>(`${this.API_URL}/auth/verify-2fa`, { user_id: userId, code }).pipe(
      tap(response => {
        const data = response.data;
        if (data.token) {
          this.clear2faSteps();
          this.handleAuthResponse(data);
        }
      })
    );
  }

  /**
   * Resend 2FA code
   */
  resend2faCode(): Observable<ApiResponse<any>> {
    const userId = localStorage.getItem(this.TWO_FA_USER_ID_KEY);
    return this.http.post<ApiResponse<any>>(`${this.API_URL}/auth/resend-2fa`, { user_id: userId });
  }

  /**
   * Get 2FA info
   */
  get2faInfo() {
    return {
      userId: localStorage.getItem(this.TWO_FA_USER_ID_KEY),
      email: localStorage.getItem(this.TWO_FA_EMAIL_KEY)
    };
  }

  /**
   * Clear 2FA temporary data
   */
  clear2faSteps(): void {
    localStorage.removeItem(this.TWO_FA_USER_ID_KEY);
    localStorage.removeItem(this.TWO_FA_EMAIL_KEY);
  }

  /**
   * Register user via API
   */
  register(userData: any): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.API_URL}/auth/register`, userData).pipe(
      tap(response => this.handleAuthResponse(response.data))
    );
  }

  /**
   * Forgot password request
   */
  forgotPassword(email: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.API_URL}/auth/forgot-password`, { email });
  }

  /**
   * Reset password request
   */
  resetPassword(data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.API_URL}/auth/reset-password`, data);
  }

  /**
   * Handle authentication response (store token and user data)
   */
  private handleAuthResponse(response: AuthResponse): void {
    if (response.token) {
      localStorage.setItem(this.TOKEN_KEY, response.token);
    }
    if (response.user) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
    }

    this.isAuthenticated.set(true);
    this.currentUser.set(response.user || null);
  }

  /**
   * Logout user and clear storage
   */
  logout(): void {
    this.clearAuth();
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
  }

  /**
   * Clear authentication data from storage
   */
  private clearAuth(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
  }

  /**
   * Get user initials for avatar
   */
  getUserInitials(): string {
    const user = this.currentUser();
    if (!user) return '';

    const firstInitial = user.firstName?.charAt(0) || '';
    const lastInitial = user.lastName?.charAt(0) || '';

    return (firstInitial + lastInitial).toUpperCase();
  }

  /**
   * Get user full name
   */
  getUserFullName(): string {
    const user = this.currentUser();
    if (!user) return '';

    return `${user.firstName} ${user.lastName}`.trim();
  }
}
