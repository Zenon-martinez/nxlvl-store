import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { maintenanceGuard } from '@guards/maintenance.guard';
/* import { authGuard } from '@guards/auth.guard'; */

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  // App privada
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [maintenanceGuard],
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
  },

  {
    path: 'maintenance',
    loadComponent: () =>
      import('./core/pages/maintenance/maintenance.component').then(
        (m) => m.MaintenanceComponent,
      ),
  },
  /* { path: 'maintenance', component: MaintenanceComponent }, */
  { path: '**', redirectTo: '' },
];
