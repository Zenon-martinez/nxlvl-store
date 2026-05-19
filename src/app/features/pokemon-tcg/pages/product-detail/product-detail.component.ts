import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonTcgService } from '../../services/pokemon-tcg.service';
import { ProductConditionData, TcgSealedProduct } from '@models/product.interface';
import { ProductBreadcrumbsComponent } from '@components/product-breadcrumbs/product-breadcrumbs.component';
import {
  ProductMediaComponent,
  ProductMediaItem,
} from '../../../admin/products/components/product-media/product-media.component';
import {
  ProductHeaderComponent,
  ProductHeaderData,
} from '@components/product-header/product-header.component';
import {
  ProductPurchasePanelComponent,
  ProductPurchasePanelData,
} from '@components/product-purchase-panel/product-purchase-panel.component';
import { ProductConditionComponent } from '../../../board-games/components/product-condition/product-condition.component';
import { ProductDetailsTabsComponent } from '@components/product-details-tabs/product-details-tabs.component';
import { RelatedProductsComponent } from '@components/related-products/related-products.component';
import { Tab } from '@models/custom-ui.interface';

@Component({
  selector: 'app-product-detail',
  imports: [
    ProductBreadcrumbsComponent,
    ProductMediaComponent,
    ProductHeaderComponent,
    ProductPurchasePanelComponent,
    ProductConditionComponent,
    ProductDetailsTabsComponent,
    RelatedProductsComponent,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  @Input() expansionId?: string;
  @Input() productId?: string;

  // Propiedades para la plantilla
  product: TcgSealedProduct | null = null;
  productImages: ProductMediaItem[] = [];
  productTitle = '';
  productHeader: ProductHeaderData | null = null;
  productPurchasePanel: ProductPurchasePanelData | null = null;
  tabs: Tab[] = [];
  productCondition: ProductConditionData | null = null;

  constructor(
    private pokemonTcgService: PokemonTcgService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    console.log(
      'ProductDetailComponent initialized with expansionId:',
      this.expansionId,
      'and productId:',
      this.productId,
    );
    console.log('Route snapshot params:', this.route);

    // Read params from the route (supports nested route: parent 'id' and child 'productId')
    const routeProductId = this.route.snapshot.paramMap.get('productId');
    const routeExpansionId = this.route.snapshot.parent!.paramMap.get('expansionId');

    const expansionId = this.expansionId || routeExpansionId || undefined;
    const productId = this.productId || routeProductId || undefined;

    if (!expansionId || !productId) {
      console.warn('Missing expansionId or productId in route or inputs', {
        expansionId,
        productId,
      });
      return;
    }

    this.pokemonTcgService.getProductDetails(expansionId, productId).subscribe({
      next: (product) => {
        this.product = product;
        this.processProductData(product);
        console.log('Product details fetched successfully:', product);
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      },
    });
  }

  private processProductData(product: TcgSealedProduct | null): void {
    if (!product) return;

    // Procesar imágenes
    this.productImages = product.media.images.map((image) => ({
      url: image.url,
      alt: product.name,
    }));

    // Procesar título
    this.productTitle = product.name;
    const headerStatus = this.toHeaderStatus(product.inventory.status);
    const conditionLabel =
      product.inventory.condition === 'sealed'
        ? 'SELLADO'
        : product.inventory.condition === 'used'
          ? 'USADO'
          : undefined;
    const language = this.getLanguageLabel(product.language);

    // Procesar encabezado del producto
    this.productHeader = {
      name: product.name,
      badges: [conditionLabel!, language],
      price: product.pricing.price,
      originalPrice: product.pricing.originalPrice ?? null,
      currency: product.pricing.currency,
      status: headerStatus,
      stock: product.inventory.stock,
    };

    this.productPurchasePanel = {
      description: product.description.long,
      stock: product.inventory.stock,
      available: headerStatus === 'in_stock' && product.inventory.stock > 0,
    };
    this.tabs = this.buildTabs(product);
    this.productCondition = this.buildProductCondition(product);
    console.log('Product tabs:', this.tabs);
  }

  private toHeaderStatus(
    status: 'in_stock' | 'out_of_stock' | 'pre_order',
  ): ProductHeaderData['status'] {
    switch (status) {
      case 'out_of_stock':
        return 'out-of-stock';
      case 'pre_order':
        return 'pre-order';
      default:
        return 'in_stock';
    }
  }

  private getLanguageLabel(language?: string): string {
    const map: Record<string, string> = {
      en: 'Inglés',
      es: 'Español',
    };
    return map[language ?? ''] ?? 'Desconocido';
  }

  private buildTabs(product: TcgSealedProduct): Tab[] {
    const tabs: Tab[] = [];

    if (product.description) {
      tabs.push({
        id: 'description',
        label: 'Descripción',
        content: product.description,
        resume: [
          { label: 'Serie', value: product.serie },
          { label: 'Expansión', value: product.expansion.name },
          { label: 'Símbolo', value: product.expansion.code },
          { label: 'Fecha de lanzamiento', value: product.releaseDate ?? 'N/A' },
          {
            label: 'Idioma',
            value: this.getLanguageLabel(product.language),
          },
        ],
      });
    }
    if (product.additionalInfo) {
      tabs.push({
        id: 'additional-info',
        label: 'Información adicional',
        content: product.additionalInfo,
        resume: [
          {
            label: 'Condición',
            value: product.inventory.condition === 'sealed' ? 'SELLADO' : 'USADO',
          },
          {
            label: 'Estado',
            value:
              product.inventory.status === 'in_stock'
                ? 'Disponible'
                : product.inventory.status === 'out_of_stock'
                  ? 'Agotado'
                  : 'Preventa',
          },
        ],
      });
    }
    /* if (product.expansions) {
        tabs.push({
          id: 'expansions',
          label: 'Expansiones',
          content: product.expansions,
        });
      } */

    return tabs;
  }

  private buildProductCondition(product: TcgSealedProduct): ProductConditionData {
    const isSealed = product.inventory.condition === 'sealed';

    return {
      condition: product.inventory.condition,
      review: {
        title: 'Revisión de componentes',
        description: isSealed
          ? 'Todas las piezas completas y selladas'
          : 'Todas las piezas completas, comprobadas por el equipo',
      },
      box: {
        title: 'Estado de la caja',
        description: isSealed
          ? 'Perfecto, sin daños ni marcas visibles'
          : 'Buen estado general, puede presentar uso ligero',
      },
      certificateText:
        'Certificado y garantizado por Next Level - Inspeccionado por nuestro equipo',
    };
  }
}
