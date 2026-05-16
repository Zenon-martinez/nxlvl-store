import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductMediaComponent } from '../../../admin/products/components/product-media/product-media.component';
import { ProductMediaItem } from '../../../admin/products/components/product-media/product-media.component';
import {
  ProductHeaderComponent,
  ProductHeaderData,
} from '@components/product-header/product-header.component';
import {
  ProductPurchasePanelComponent,
  ProductPurchasePanelData,
} from '@components/product-purchase-panel/product-purchase-panel.component';
import { ProductConditionComponent } from '../../components/product-condition/product-condition.component';
import { ProductConditionData } from '@models/product.interface';
import { ProductDetailsTabsComponent } from '@components/product-details-tabs/product-details-tabs.component';
import { RelatedProductsComponent } from '@components/related-products/related-products.component';
import { ProductBreadcrumbsComponent } from '@components/product-breadcrumbs/product-breadcrumbs.component';
import { BoardGamesService } from '../../services/board-games.service';
import { Tab } from '@models/custom-ui.interface';
import { BoardGameProduct } from '@models/product.interface';

@Component({
  selector: 'app-product-detail',
  imports: [
    ProductMediaComponent,
    ProductHeaderComponent,
    ProductPurchasePanelComponent,
    ProductConditionComponent,
    ProductDetailsTabsComponent,
    RelatedProductsComponent,
    ProductBreadcrumbsComponent,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  @Input() id!: string;
  productImages: ProductMediaItem[] = [];
  productTitle = 'Product image';
  productHeader: ProductHeaderData | null = null;
  productPurchasePanel: ProductPurchasePanelData | null = null;
  productCondition: ProductConditionData | null = null;
  tabs: Tab[] = [];
  constructor(
    private readonly productService: BoardGamesService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    const productId = routeId || this.id;

    if (!productId) {
      return;
    }

    this.productService.getBoardGameById(productId).subscribe({
      next: (product) => {
        console.log('Fetched product details:', product);
        this.productImages = product.media.images.map((image) => ({
          url: image.url,
          alt: product.name,
        }));
        this.productTitle = product.name;

        const conditionLabel =
          product.inventory.condition === 'sealed'
            ? 'SELLADO'
            : product.inventory.condition === 'used'
              ? 'USADO'
              : undefined;

        const headerStatus = this.toHeaderStatus(product.inventory.status);
        const language =
          product.language === 'en'
            ? 'Inglés'
            : product.language === 'es'
              ? 'Español'
              : 'Desconocido';

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
          description: product.description.short,
          stock: product.inventory.stock,
          available: headerStatus === 'in_stock' && product.inventory.stock > 0,
        };
        this.productCondition = this.buildProductCondition(product);
        this.tabs = this.buildTabs(product);
        console.log('Product tabs:', this.tabs);
      },
      error: (err) => {
        console.error('Error fetching product details:', err);
      },
    });
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

  private buildTabs(product: BoardGameProduct): Tab[] {
    const tabs: Tab[] = [];

    if (product.description) {
      tabs.push({
        id: 'description',
        label: 'Descripción',
        content: product.description,
        resume: [
          { label: 'Tipo de producto', value: product.productType },
          { label: 'Expansión', value: product.editorial.publisher },
          { label: 'Idioma', value: product.language },
        ],
      });
    }
    if (product.additionalInfo) {
      tabs.push({
        id: 'additional-info',
        label: 'Información adicional',
        content: product.additionalInfo,
        resume: [
          { label: 'Condición', value: product.inventory.condition },
          { label: 'Estado', value: product.inventory.status },
        ],
      });
    }
    if (product.howToPlay) {
      tabs.push({
        id: 'how-to-play',
        label: 'Cómo jugar',
        content: product.howToPlay,
        resume: [],
      });
    }
    if (product.expansions) {
      tabs.push({
        id: 'expansions',
        label: 'Expansiones',
        content: product.expansions,
        resume: [],
      });
    }

    return tabs;
  }

  private buildProductCondition(product: BoardGameProduct): ProductConditionData {
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
      manual: {
        title: 'Manual de instrucciones',
        description: 'Incluido y en buen estado',
      },
      certificateText:
        'Certificado y garantizado por Next Level - Inspeccionado por nuestro equipo',
    };
  }
}
