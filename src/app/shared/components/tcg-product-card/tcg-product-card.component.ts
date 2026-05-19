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
    if (!this.product) return;

    const expansionCode = this.product.expansion?.code ?? '';

    // Match route: /pokemon-tcg/expansions/:id/details/:expansionId/:productId
    // Use expansionCode for both the parent :id and the child :expansionId
    this.router.navigate([
      '/pokemon-tcg',
      'expansions',
      expansionCode,
      'details',
      this.product.id,
    ]);
  }
}
