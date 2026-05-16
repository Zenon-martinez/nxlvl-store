import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TcgSealedProduct } from '@models/product.interface';

@Component({
  selector: 'app-tcg-product-card',
  imports: [CommonModule],
  templateUrl: './tcg-product-card.component.html',
  styleUrl: './tcg-product-card.component.scss',
})
export class TcgProductCardComponent {
  @Input() product?: TcgSealedProduct;

  language: Record<string, string> = {
    en: 'Inglés',
    es: 'Español',
  };

  constructor(private router: Router) {}

  viewDetails() {
    // Implementation for viewing product details
    this.router.navigate([
      '/pokemon-tcg/details',
      this.product?.expansion.code,
      this.product?.id,
    ]);
  }
}
