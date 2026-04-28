import { Component, OnInit } from '@angular/core';
import { Set, SetsResponse } from '@models/pokemon-tcg.interface';
import { SealedPkmCardComponent } from '../../components/sealed-pkm-card/sealed-pkm-card.component';
import { PokemonTcgService } from '../../services/pokemon-tcg.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-expansions-catalog',
  imports: [SealedPkmCardComponent, MatIcon],
  templateUrl: './expansions-catalog.component.html',
  styleUrl: './expansions-catalog.component.scss',
})
export class ExpansionsCatalogComponent implements OnInit {
  expansions: Set[] = [];

  constructor(private pokemonTcgService: PokemonTcgService) {}

  ngOnInit(): void {
    this.loadExpansions();
  }

  private loadExpansions(): void {
    this.pokemonTcgService.getExpansions().subscribe((expansions: SetsResponse) => {
      this.expansions = expansions.sets;
    });
  }
}
