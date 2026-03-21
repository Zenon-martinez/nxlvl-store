import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout/admin-layout.component';
import { DashboardPageComponent } from './admin-dashboard/pages/dashboard-page/dashboard-page.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    /* canActivate: [AdminGuard], */
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: DashboardPageComponent,
      },
      /* {
        path: 'cards',
        loadChildren: () =>
          import('./cards/cards.routes'),
      }, */
      {
        path: 'products',
        loadChildren: () =>
          import('./products/products.routes').then((m) => m.PRODUCTS_ROUTES),
      },
      {
        path: 'inventory',
        loadChildren: () =>
          import('./inventory/inventory.routes').then((m) => m.INVENTORY_ROUTES),
      },
      {
        path: 'orders',
        loadChildren: () => import('./orders/orders.routes').then((m) => m.ORDERS_ROUTES),
      },
      /* {
        path: 'events',
        loadChildren: () =>
          import('./admin-events/events.routes'),
      }, */
      {
        path: 'imports', // 🔥 importante
        loadChildren: () =>
          import('./imports/imports.routes').then((m) => m.IMPORTS_ROUTES),
      },
    ],
  },
];
