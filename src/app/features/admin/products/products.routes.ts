import { Routes } from '@angular/router';
import { CatalogComponent } from './pages/catalog/catalog.component';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: 'product-catalog',
    component: CatalogComponent,
  },
];
