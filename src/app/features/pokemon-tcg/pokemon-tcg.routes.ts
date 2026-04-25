import { ActivatedRouteSnapshot, Data, Routes } from '@angular/router';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ExpansionsCatalogComponent } from './pages/expansions-catalog/expansions-catalog.component';

const detailBreadcrumb = (_data: Data, route: ActivatedRouteSnapshot): string => {
  const productId = route.paramMap.get('id');
  return productId ? `Producto ${productId}` : 'Detalle';
};

export const POKEMON_TCG_ROUTES: Routes = [
  {
    path: '',
    component: ExpansionsCatalogComponent,
    title: 'Next Level | Pokémon TCG',
    data: {
      breadcrumb: 'Catalogo',
    },
  },
  {
    path: 'details/:id',
    component: ProductDetailComponent,
    title: 'Next Level | Detalles del producto',
    data: {
      breadcrumb: detailBreadcrumb,
    },
  },
];
