import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Set } from '@models/pokemon-tcg.interface';

@Component({
  selector: 'app-sealed-pkm-card',
  imports: [MatIcon],
  templateUrl: './sealed-pkm-card.component.html',
  styleUrl: './sealed-pkm-card.component.scss',
})
export class SealedPkmCardComponent {
  @Input({ required: true }) setData!: Set;

  constructor(private route: Router) {}

  get availabilityLabel(): string {
    switch (this.setData.status.availability) {
      case 'available':
        return 'Disponible';
      case 'out_of_stock':
        return 'Agotado';
      case 'upcoming':
        return 'Próximamente';
      default:
        return 'Sin estado';
    }
  }

  get availabilityDotClass(): string {
    switch (this.setData.status.availability) {
      case 'available':
        return 'bg-green-500';
      case 'out_of_stock':
        return 'bg-error';
      case 'upcoming':
        return 'bg-amber-400';
      default:
        return 'bg-slate-500';
    }
  }

  get availabilityTextClass(): string {
    switch (this.setData.status.availability) {
      case 'available':
        return 'text-green-500';
      case 'out_of_stock':
        return 'text-error';
      case 'upcoming':
        return 'text-amber-400';
      default:
        return 'text-slate-500';
    }
  }

  get ctaIcon(): string {
    return this.setData.ui.cta.icon || 'chevron_right';
  }

  badgeClass(variant: string): string {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-white';
      case 'secondary':
        return 'bg-green-600 text-white';
      case 'warning':
        return 'bg-amber-400 text-slate-950';
      default:
        return 'bg-surface-container-highest border border-white/10 text-slate-300';
    }
  }

  goToExpansion() {
    this.route.navigate(['/pokemon-tcg/expansions/', this.setData.id]);
  }
}
