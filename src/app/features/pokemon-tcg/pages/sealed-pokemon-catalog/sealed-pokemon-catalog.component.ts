import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import {
  HeroSectionExpansionComponent,
  HeroSectionExpansionData,
} from '@components/hero-section-expansion/hero-section-expansion.component';
import { PokemonTcgService } from '../../services/pokemon-tcg.service';
import { Set } from '@models/pokemon-tcg.interface';
import { TcgProductCardComponent } from '@components/tcg-product-card/tcg-product-card.component';
import { ExpansionCatalog, ProductSection } from '@models/product.interface';

@Component({
  selector: 'app-sealed-pokemon-catalog',
  imports: [
    CommonModule,
    HeroSectionExpansionComponent,
    TcgProductCardComponent,
    RouterModule,
  ],
  templateUrl: './sealed-pokemon-catalog.component.html',
  styleUrl: './sealed-pokemon-catalog.component.scss',
})
export class SealedPokemonCatalogComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  @Input() expansionId!: string;
  heroData?: HeroSectionExpansionData;
  catalogBySet: ExpansionCatalog | null = null;
  productSections: ProductSection[] = [];
  showCatalog = true;

  constructor(
    private route: ActivatedRoute,
    private pokemonTcgService: PokemonTcgService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // hide catalog when navigating to child 'details' route
    this.updateCatalogVisibility(this.router.url);
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
      const nav = e as NavigationEnd;
      this.updateCatalogVisibility(nav.urlAfterRedirects);
    });

    const routeId = this.route.snapshot.paramMap.get('expansionId');
    const setId = routeId || this.expansionId;

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
    this.pokemonTcgService.getProductsByExpansionId(setId).subscribe({
      next: (catalog) => {
        if (catalog) {
          this.catalogBySet = catalog;
          this.productSections = catalog.sections.sort((a, b) => a.order - b.order);
          console.log('Products for expansion:', this.catalogBySet);
        }
      },
      error: (error) => {
        console.error('Error fetching products for expansion:', error);
      },
    });
  }

  ngAfterViewInit(): void {
    this.centerScroll(600);
  }

  centerScroll(time = 300) {
    setTimeout(() => {
      const container = this.scrollContainer.nativeElement;
      const centerPosition = container.scrollWidth / 2 - container.clientWidth / 2;
      container.scrollLeft = centerPosition;
      console.log('Scroll container centered at position:', centerPosition);
    }, time);
  }

  private mapSetToHeroData(set: Set): HeroSectionExpansionData {
    return {
      id: set.id,
      name: set.name,
      tcg: {
        setCode: set.tcg.setCode,
        era: set.tcg.era,
        symbol: set.tcg.symbol,
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

  private updateCatalogVisibility(url: string) {
    this.showCatalog = !url.includes('/details/');
  }
}
