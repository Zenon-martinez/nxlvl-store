import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductMediaComponent } from '../../../admin/products/components/product-media/product-media.component';
import { ProductMediaItem } from '../../../admin/products/components/product-media/product-media.component';
import { ProductHeaderComponent, ProductHeaderData } from '@components/product-header/product-header.component';
import { ProductPurchasePanelComponent } from '@components/product-purchase-panel/product-purchase-panel.component';
import { ProductConditionComponent } from '../../components/product-condition/product-condition.component';
import { ProductDetailsTabsComponent } from '@components/product-details-tabs/product-details-tabs.component';
import { RelatedProductsComponent } from '@components/related-products/related-products.component';
import { ProductBreadcrumbsComponent } from '@components/product-breadcrumbs/product-breadcrumbs.component';
import { BoardGamesService } from '../../services/board-games.service';

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
        const rawImages = (product as { images?: unknown[] }).images ?? [];
        const mappedImages: ProductMediaItem[] = [];

        for (const image of rawImages) {
          if (typeof image === 'string') {
            mappedImages.push({ url: image, alt: product.name });
            continue;
          }

          if (image && typeof image === 'object' && 'url' in image) {
            mappedImages.push({
              url: String((image as { url: string }).url),
              alt: product.name,
            });
          }
        }

        this.productImages = mappedImages;
        this.productTitle = product.name;

        const raw = product as unknown as Record<string, unknown>;

        const conditionLabel = raw['condition'] === 'demo' ? 'DEMO / MUESTRA' :
          raw['condition'] === 'sealed' ? 'SELLADO' : undefined;

        this.productHeader = {
          name: product.name,
          badge: conditionLabel,
          price: product.price,
          originalPrice: product.originalPrice ?? null,
          currency: raw['currency'] as string | undefined ?? 'MXN',
          status: product.status as ProductHeaderData['status'],
          stock: raw['stock'] as number | undefined,
        };
      },
      error: (err) => {
        console.error('Error fetching product details:', err);
      },
    });
  }
}
