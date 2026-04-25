import { Component, Input } from '@angular/core';

export interface ProductSpecItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-product-specs-list',
  imports: [],
  templateUrl: './product-specs-list.component.html',
  styleUrl: './product-specs-list.component.scss',
})
export class ProductSpecsListComponent {
  @Input() title = 'Especificaciones';
  @Input() items: ProductSpecItem[] = [];
}
