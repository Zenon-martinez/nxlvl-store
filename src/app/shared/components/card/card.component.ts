import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-card',
  imports: [CommonModule, MatIcon],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input({ required: true }) quickAccess = true;
  @Input({ required: true }) title = 'Título de la Tarjeta';
  @Input({ required: true }) description = 'Descripción breve de la tarjeta.';
  @Input({ required: true }) imageUrl = 'https://via.placeholder.com/400x200';
  @Input({ required: true }) link: { url: string; text: string } = {
    url: '#',
    text: 'Ver Detalles',
  };
}
