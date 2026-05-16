import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ProductConditionData } from '@models/product.interface';

@Component({
  selector: 'app-product-condition',
  imports: [MatIcon],
  templateUrl: './product-condition.component.html',
  styleUrl: './product-condition.component.scss',
})
export class ProductConditionComponent {
  @Input() data: ProductConditionData | null = null;
}

