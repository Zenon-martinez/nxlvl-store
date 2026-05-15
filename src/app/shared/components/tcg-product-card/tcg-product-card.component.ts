import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TcgSealedProduct } from '@models/product.interface';

@Component({
  selector: 'app-tcg-product-card',
  imports: [CommonModule],
  templateUrl: './tcg-product-card.component.html',
  styleUrl: './tcg-product-card.component.scss'
})
export class TcgProductCardComponent {
  @Input() product?: TcgSealedProduct;
}
