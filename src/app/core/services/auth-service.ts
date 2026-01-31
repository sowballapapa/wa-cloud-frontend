import { Injectable, signal } from '@angular/core';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';

  // Signal to track authentication state
  isAuthenticated = signal<boolean>(false);
  currentUser = signal<User | null>(null);

  constructor() {
    // Check authentication status on service initialization
    this.checkAuthStatus();
  }

  /**
   * Check if user is authenticated by validating token from storage
   */
  checkAuthStatus(): boolean {
    const token = this.getToken();

    if (token) {
      // Validate token (you can add JWT validation here)
      const isValid = this.validateToken(token);

      if (isValid) {
        // Load user data
        const userData = this.getUserData();
        this.currentUser.set(userData);
        this.isAuthenticated.set(true);
        return true;
      } else {
        // Token invalid, clear storage
        this.clearAuth();
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
    // Try localStorage first
    let token = localStorage.getItem(this.TOKEN_KEY);

    // If not in localStorage, try sessionStorage
    if (!token) {
      token = sessionStorage.getItem(this.TOKEN_KEY);
    }

    return token;
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
   * Validate token (basic validation - extend with JWT validation)
   */
  private validateToken(token: string): boolean {
    // Basic validation: check if token exists and is not empty
    if (!token || token.trim() === '') {
      return false;
    }

    // TODO: Add JWT validation here
    // For now, just check if token exists
    // You can decode JWT and check expiration:
    // try {
    //   const payload = JSON.parse(atob(token.split('.')[1]));
    //   const exp = payload.exp * 1000; // Convert to milliseconds
    //   return Date.now() < exp;
    // } catch {
    //   return false;
    // }

    return true;
  }

  /**
   * Login user and store token
   */
  login(token: string, user: User, rememberMe: boolean = false): void {
    const storage = rememberMe ? localStorage : sessionStorage;

    storage.setItem(this.TOKEN_KEY, token);
    storage.setItem(this.USER_KEY, JSON.stringify(user));

    this.isAuthenticated.set(true);
    this.currentUser.set(user);
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
