import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ProductHeaderData {
  name: string;
  badge?: string;
  price: number;
  originalPrice?: number | null;
  currency?: string;
  status: 'available' | 'out-of-stock' | 'pre-order' | 'in_stock';
  stock?: number;
}

@Component({
  selector: 'app-product-header',
  imports: [CommonModule],
  templateUrl: './product-header.component.html',
  styleUrl: './product-header.component.scss',
})
export class ProductHeaderComponent {
  @Input({ required: true }) data!: ProductHeaderData;

  get hasDiscount(): boolean {
    return (
      this.data.originalPrice != null &&
      this.data.originalPrice > this.data.price
    );
  }

  get currencySymbol(): string {
    const symbols: Record<string, string> = { MXN: '$', USD: '$', EUR: '€' };
    return symbols[this.data.currency ?? 'MXN'] ?? '$';
  }

  get stockLabel(): string {
    switch (this.data.status) {
      case 'in_stock':
      case 'available':
        return this.data.stock != null
          ? `EN STOCK — ${this.data.stock} ${this.data.stock === 1 ? 'UNIDAD' : 'UNIDADES'}`
          : 'EN STOCK';
      case 'out-of-stock':
        return 'AGOTADO';
      case 'pre-order':
        return 'PRE-ORDEN';
      default:
        return '';
    }
  }

  get isAvailable(): boolean {
    return this.data.status === 'in_stock' || this.data.status === 'available';
  }

  get isPreOrder(): boolean {
    return this.data.status === 'pre-order';
  }
}
