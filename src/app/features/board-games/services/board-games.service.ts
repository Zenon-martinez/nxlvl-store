import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BoardGameProductResponse } from '@models/product.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardGamesService {
  private apiUrl = 'assets/board-games.json';
  constructor(private http: HttpClient) {}

  getBoardGames(): Observable<BoardGameProductResponse> {
    return this.http.get<BoardGameProductResponse>(this.apiUrl);
  }
}
