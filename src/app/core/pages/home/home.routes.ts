import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Next Level | Home',
  },

  // ===== CATALOGO =====
  {
    path: 'catalog',
    loadChildren: () =>
      import('../../../features/catalog/catalog.routes').then((m) => m.CATALOG_ROUTES),
  },
  {
    path: 'ranking',
    loadChildren: () =>
      import('../../../features/ranking/ranking.routes').then((m) => m.RANKING_ROUTES),
  },
  {
    path: 'events',
    loadChildren: () =>
      import('../../../features/events/events.routes').then((m) => m.EVENTS_ROUTES),
  },

  /* // ===== DETALLE CARTA =====
  {
    path: 'card/:id',
    loadChildren: () =>
      import('../../../features/card-detail/card-detail.routes')
        .then(m => m.CARD_DETAIL_ROUTES)
  },

  // ===== PRODUCTO SELLADO =====
  {
    path: 'product/:id',
    loadChildren: () =>
      import('../../../features/sealed-product/sealed-product.routes')
        .then(m => m.SEALED_PRODUCT_ROUTES)
  },

  // ===== EVENTOS =====
  {
    path: 'events',
    loadChildren: () =>
      import('../../../features/events/events.routes')
        .then(m => m.EVENTS_ROUTES)
  },

  // ===== CARRITO =====
  {
    path: 'cart',
    loadChildren: () =>
      import('../../../features/cart/cart.routes')
        .then(m => m.CART_ROUTES)
  },

  // ===== CUENTA =====
  {
    path: 'account',
    loadChildren: () =>
      import('../../../features/account/account.routes')
        .then(m => m.ACCOUNT_ROUTES)
  },
 */
  // ===== FALLBACK =====
  {
    path: '**',
    redirectTo: '',
  },
];
