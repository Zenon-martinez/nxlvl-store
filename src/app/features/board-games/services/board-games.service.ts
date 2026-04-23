import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BoardGameProduct, BoardGameProductResponse } from '@models/product.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardGamesService {
  private apiUrl = 'assets/board-games.json';
  constructor(private http: HttpClient) {}

  getBoardGames(): Observable<BoardGameProductResponse> {
    return this.http.get<BoardGameProductResponse>(this.apiUrl);
  }

  getBoardGameById(id: string): Observable<BoardGameProduct> {
    return this.getBoardGames().pipe(
      map((response) => {
        const product = response.products.find((item) => String(item.id) === id);

        if (!product) {
          throw new Error(`Board game with id '${id}' not found`);
        }

        return product;
      }),
    );
  }
}
