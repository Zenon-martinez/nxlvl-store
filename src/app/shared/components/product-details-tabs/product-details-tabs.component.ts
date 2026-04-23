import { Component } from '@angular/core';
import { ProductSpecsListComponent } from '@components/product-specs-list/product-specs-list.component';

@Component({
  selector: 'app-product-details-tabs',
  imports: [ProductSpecsListComponent],
  templateUrl: './product-details-tabs.component.html',
  styleUrl: './product-details-tabs.component.scss',
})
export class ProductDetailsTabsComponent {}
