import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetBadge, AvailabilityStatus } from '@models/pokemon-tcg.interface';

export interface HeroSectionExpansionData {
  id: string;
  name: string;
  tcg: {
    setCode: string;
  };
  release: {
    formatted: string;
  };
  status: {
    availability: AvailabilityStatus;
  };
  media: {
    coverImage: string;
    background: {
      image: string;
    };
  };
  ui: {
    badges: SetBadge[];
  };
}

@Component({
  selector: 'app-hero-section-expansion',
  imports: [CommonModule],
  templateUrl: './hero-section-expansion.component.html',
  styleUrl: './hero-section-expansion.component.scss',
})
export class HeroSectionExpansionComponent {
  @Input({ required: false }) heroData?: HeroSectionExpansionData;

  get data(): HeroSectionExpansionData {
    return this.heroData ?? this.fallbackData;
  }

  get heroBackground(): string {
    return this.data.media.background.image || this.data.media.coverImage;
  }

  get releaseLabel(): string {
    return this.data.release.formatted || 'Por definir';
  }

  get availabilityLabel(): string {
    switch (this.data.status.availability) {
      case 'available':
        return 'Available Now';
      case 'out_of_stock':
        return 'Out of Stock';
      case 'upcoming':
        return 'Coming Soon';
      default:
        return 'Unknown';
    }
  }

  get heroTitleMain(): string {
    const parts = this.data.name.split('—');
    return parts.length > 1 ? parts.slice(0, -1).join('—') + '—' : this.data.name;
  }

  get heroTitleCode(): string {
    const parts = this.data.name.split('—');
    return parts.length > 1 ? parts[parts.length - 1] : this.data.tcg.setCode;
  }

  badgeClass(variant: string): string {
    switch (variant) {
      case 'primary':
        return 'bg-tertiary-container text-white';
      case 'secondary':
        return 'bg-white/10 text-slate-300 border border-white/10';
      case 'warning':
        return 'bg-error text-white';
      default:
        return 'bg-white/10 text-slate-300 border border-white/10';
    }
  }

  private readonly fallbackData: HeroSectionExpansionData = {
    id: 'MEW151',
    name: 'Scarlet & Violet—151',
    tcg: {
      setCode: '151',
    },
    release: {
      formatted: 'Sept 22, 2023',
    },
    status: {
      availability: 'available',
    },
    media: {
      coverImage:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAKkoRD3BcivOL5K0cZTKtSky0w89Nri-uU0LDqO1LKgOOE_BeCLpp1LAvSs3aIQxgZtj8IvRULegRFOdZBJ_NkYa4RYGxjKlIlbT0RVrdBYjXhqczJlrpEubIUBBurLJcMv4Dg_hIZ3t8GoBTQSZWQspR-2ELmdmGGFrCowgWASuZDgPFzXjTBM0JpHep4KFWQQi_WqY20rY44D_bJ2SLJ7B5SHc7iVCWG5xTsJRQndQ4tQzOQhBSm_ogRnjYI9i08dFrKfv6mf60',
      background: {
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAKkoRD3BcivOL5K0cZTKtSky0w89Nri-uU0LDqO1LKgOOE_BeCLpp1LAvSs3aIQxgZtj8IvRULegRFOdZBJ_NkYa4RYGxjKlIlbT0RVrdBYjXhqczJlrpEubIUBBurLJcMv4Dg_hIZ3t8GoBTQSZWQspR-2ELmdmGGFrCowgWASuZDgPFzXjTBM0JpHep4KFWQQi_WqY20rY44D_bJ2SLJ7B5SHc7iVCWG5xTsJRQndQ4tQzOQhBSm_ogRnjYI9i08dFrKfv6mf60',
      },
    },
    ui: {
      badges: [
        { label: 'Limited Edition', variant: 'primary' },
        { label: 'High Demand', variant: 'warning' },
      ],
    },
  };
}
