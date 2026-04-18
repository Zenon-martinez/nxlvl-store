import { Component, Input } from '@angular/core';
import { BoardGameCardComponent } from '../board-game-card/board-game-card.component';
import { BoardGameProduct } from '@models/product.interface';

@Component({
  selector: 'app-product-grid',
  imports: [BoardGameCardComponent],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.scss',
})
export class ProductGridComponent {
  @Input({ required: true }) products: BoardGameProduct[] = [];
}
