import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BoardGameProduct } from '@models/product.interface';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-board-game-card',
  imports: [MatIcon],
  templateUrl: './board-game-card.component.html',
  styleUrl: './board-game-card.component.scss',
})
export class BoardGameCardComponent {
  @Input({ required: true }) product!: BoardGameProduct;
  status = '';
  condition = '';

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (!changes['product'] || !changes['product'].currentValue) return;
    this.status = this.setStatusLabel(this.product.status);
    this.condition = this.setTypeLabel(this.product.condition!);
    console.log('Product changed:', this.condition);
  }

  private setStatusLabel(status: string): string {
    switch (status) {
      case 'available':
      case 'in_stock':
        return 'Disponible';
      case 'out-of-stock':
        return 'Agotado';
      case 'pre-order':
        return 'Pre-orden';
      default:
        return status;
    }
  }

  private setTypeLabel(type: string): string {
    switch (type) {
      case 'sealed':
        return 'Sellado';
      case 'demo':
        return 'Demo';
      default:
        return type;
    }
  }

  viewDetails() {
    this.router.navigate(['/board-games/details', this.product.id]);
  }
}
