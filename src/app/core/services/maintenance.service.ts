import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  private _isMaintenance = signal(false);
  isMaintenance = this._isMaintenance.asReadonly();

  constructor(private http: HttpClient) {}

  enable() {
    this._isMaintenance.set(true);
  }

  disable() {
    this._isMaintenance.set(false);
  }

  checkServer() {
    this.http.get('/api/health').subscribe({
      next: () => this.disable(),
      error: () => this.enable(),
    });
  }
}
