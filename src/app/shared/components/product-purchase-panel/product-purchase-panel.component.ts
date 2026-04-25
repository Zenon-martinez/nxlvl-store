import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

export interface ProductPurchasePanelData {
  description: string;
  stock: number;
  available: boolean;
}

@Component({
  selector: 'app-product-purchase-panel',
  imports: [MatIcon],
  templateUrl: './product-purchase-panel.component.html',
  styleUrl: './product-purchase-panel.component.scss',
})
export class ProductPurchasePanelComponent {
  @Input() data: ProductPurchasePanelData | null = null;

  quantity = 1;

  get canDecrement(): boolean {
    return this.quantity > 1;
  }

  get canIncrement(): boolean {
    return !!this.data && this.quantity < this.data.stock;
  }

  decrement(): void {
    if (this.canDecrement) this.quantity--;
  }

  increment(): void {
    if (this.canIncrement) this.quantity++;
  }

  onQuantityChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    let val = parseInt(input.value, 10);
    const max = this.data?.stock ?? 1;
    if (isNaN(val) || val < 1) val = 1;
    if (val > max) val = max;
    this.quantity = val;
    input.value = String(this.quantity);
  }
}
