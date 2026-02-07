import { Injectable, signal } from '@angular/core';

export type ErrorType = 401 | 403 | 404 | null;

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private _errorType = signal<ErrorType>(null);
  errorType = this._errorType.asReadonly();

  setError(type: ErrorType) {
    this._errorType.set(type);
  }

  clearError() {
    this._errorType.set(null);
  }
}
