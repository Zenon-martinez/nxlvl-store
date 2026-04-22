import { Routes } from '@angular/router';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

export const BOARD_GAMES_ROUTES: Routes = [
  {
    path: '',
    component: CatalogComponent,
    title: 'Next Level | Juegos de Mesa',
  },
  {
    path: 'details/:id',
    component: ProductDetailComponent,
    title: 'Next Level | Detalles del Juego',
  },
];
