import { ActivatedRouteSnapshot, Data, Routes } from '@angular/router';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

const detailBreadcrumb = (_data: Data, route: ActivatedRouteSnapshot): string => {
  const productId = route.paramMap.get('id');
  return productId ? `Producto ${productId}` : 'Detalle';
};

export const BOARD_GAMES_ROUTES: Routes = [
  {
    path: '',
    component: CatalogComponent,
    title: 'Next Level | Juegos de Mesa',
    data: {
      breadcrumb: 'Catalogo',
    },
  },
  {
    path: 'details/:id',
    component: ProductDetailComponent,
    title: 'Next Level | Detalles del Juego',
    data: {
      breadcrumb: detailBreadcrumb,
    },
  },
];
