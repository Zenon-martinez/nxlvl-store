import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  HeroSectionExpansionComponent,
  HeroSectionExpansionData,
} from '@components/hero-section-expansion/hero-section-expansion.component';
import { PokemonTcgService } from '../../services/pokemon-tcg.service';
import { Set } from '@models/pokemon-tcg.interface';

@Component({
  selector: 'app-sealed-pokemon-catalog',
  imports: [HeroSectionExpansionComponent],
  templateUrl: './sealed-pokemon-catalog.component.html',
  styleUrl: './sealed-pokemon-catalog.component.scss',
})
export class SealedPokemonCatalogComponent implements OnInit {
  @Input() id!: string;
  heroData?: HeroSectionExpansionData;

  constructor(
    private route: ActivatedRoute,
    private pokemonTcgService: PokemonTcgService,
  ) {}

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    const setId = routeId || this.id;

    if (!setId) {
      return;
    }

    this.pokemonTcgService.getExpansionById(setId).subscribe({
      next: (set) => {
        this.heroData = this.mapSetToHeroData(set);
      },
      error: (error) => {
        console.error('Error fetching expansion data:', error);
      },
    });
  }

  private mapSetToHeroData(set: Set): HeroSectionExpansionData {
    return {
      id: set.id,
      name: set.name,
      tcg: {
        setCode: set.tcg.setCode,
      },
      release: {
        formatted: set.release.formatted,
      },
      status: {
        availability: set.status.availability,
      },
      media: {
        coverImage: set.media.coverImage,
        background: {
          image: set.media.background.image,
        },
      },
      ui: {
        badges: set.ui.badges,
      },
    };
  }
}
