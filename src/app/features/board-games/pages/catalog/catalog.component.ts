import { Component, OnInit } from '@angular/core';
import { FiltersComponent } from '../../components/filters/filters.component';
import { MatIcon } from '@angular/material/icon';
import { ProductGridComponent } from '../../components/product-grid/product-grid.component';
import { BoardGameProduct, BoardGameProductResponse } from '@models/product.interface';
import { BoardGamesService } from '../../services/board-games.service';

@Component({
  selector: 'app-catalog',
  imports: [FiltersComponent, MatIcon, ProductGridComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent implements OnInit {
  products: BoardGameProduct[] = [];

  constructor(private boardGameService: BoardGamesService) {}

  ngOnInit(): void {
    this.boardGameService
      .getBoardGames()
      .subscribe((response: BoardGameProductResponse) => {
        this.products = response.products;
      });
  }
}
