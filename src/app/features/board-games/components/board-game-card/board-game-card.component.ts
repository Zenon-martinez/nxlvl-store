import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BoardGameProduct } from '@models/product.interface';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-board-game-card',
  imports: [MatIcon],
  templateUrl: './board-game-card.component.html',
  styleUrl: './board-game-card.component.scss',
})
export class BoardGameCardComponent implements OnChanges {
  @Input({ required: true }) product!: BoardGameProduct;
  status = '';
  condition = '';

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['product'] || !changes['product'].currentValue) return;
    this.status = this.setStatusLabel(this.product.inventory.status);
    this.condition = this.setTypeLabel(this.product.inventory.condition);
  }

  private setStatusLabel(status: string): string {
    switch (status) {
      case 'in_stock':
        return 'Disponible';
      case 'out_of_stock':
        return 'Agotado';
      case 'pre_order':
        return 'Pre-orden';
      default:
        return status;
    }
  }

  private setTypeLabel(type: string): string {
    switch (type) {
      case 'sealed':
        return 'Sellado';
      case 'used':
        return 'Usado';
      default:
        return type;
    }
  }

  viewDetails() {
    this.router.navigate(['/board-games/details', this.product.id]);
  }
}
