import { computed, Injectable, signal } from '@angular/core';

export interface User {
  // Define your user properties here
  id?: string;
  name?: string;
  email?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  // Layout
  private _sidebarOpen = signal(true);
  private _rightPanelOpen = signal(false);
  private _isMobile = signal(false);

  // ===== Estado base =====
  private _loading = signal(0);
  private _maintenance = signal(false);
  private _blocked = signal(false);
  private _authenticated = signal(false);
  private _notifications = signal(0);
  private _user = signal<User | null>(null);

  // ===== Selectors (computed) =====
  isLoading = computed(() => this._loading() > 0);
  isMaintenance = this._maintenance.asReadonly();
  isAuthenticated = this._authenticated.asReadonly();
  isBlocked = this._blocked.asReadonly();
  notifications = this._notifications.asReadonly();
  user = this._user.asReadonly();

  // ===== Mutations =====

  toggleSidebar() {
    this._sidebarOpen.update((v) => !v);
  }

  openRightPanel() {
    this._rightPanelOpen.set(true);
  }

  closeRightPanel() {
    this._rightPanelOpen.set(false);
  }

  startRequest() {
    this._loading.update((v) => v + 1);
  }

  endRequest() {
    this._loading.update((v) => Math.max(0, v - 1));
  }

  setMaintenance(value: boolean) {
    this._maintenance.set(value);
  }

  setAuthenticated(value: boolean) {
    this._authenticated.set(value);
  }

  setUser(user: User | null) {
    this._user.set(user);
    this._authenticated.set(!!user);
  }

  blockUI() {
    this._blocked.set(true);
  }

  unblockUI() {
    this._blocked.set(false);
  }

  setNotifications(count: number) {
    this._notifications.set(count);
  }
}
