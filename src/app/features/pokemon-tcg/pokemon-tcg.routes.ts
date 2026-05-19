import { ActivatedRouteSnapshot, Data, Routes } from '@angular/router';
import { TcgSealedProduct } from '@models/product.interface';
import { ProductResolver } from './services/product.resolver';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ExpansionsCatalogComponent } from './pages/expansions-catalog/expansions-catalog.component';
import { SealedPokemonCatalogComponent } from './pages/sealed-pokemon-catalog/sealed-pokemon-catalog.component';

const detailBreadcrumb = (data: Data, route: ActivatedRouteSnapshot): string => {
  console.log('Datos disponibles:', data);
  const resolved = data?.['product'] as TcgSealedProduct | undefined;
  if (resolved && resolved.name) return resolved.name;
  const expansion = data?.['expansion'] as string | undefined;
  if (expansion) return expansion;

  const productId = route.paramMap.get('expansionId') || route.paramMap.get('productId');
  return productId ? `${productId.replaceAll('-', ' ')}` : 'Detalle';
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
    path: 'expansions/:expansionId',
    component: SealedPokemonCatalogComponent,
    title: 'Next Level | Productos de la expansión',
    resolve: { expansion: ProductResolver },
    data: {
      breadcrumb: detailBreadcrumb,
    },
    children: [
      {
        path: 'details/:productId',
        component: ProductDetailComponent,
        title: 'Next Level | Detalles del producto',
        resolve: { product: ProductResolver },
        data: {
          breadcrumb: detailBreadcrumb,
        },
      },
    ],
  },
];
