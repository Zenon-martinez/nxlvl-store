import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Set, SetsResponse } from '@models/pokemon-tcg.interface';
import { ExpansionCatalog, TcgSealedProduct } from '@models/product.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonTcgService {
  private apiUrl = 'assets/sets.json';
  private productApiUrl = 'assets/products-by-set.json';

  constructor(private http: HttpClient) {}

  getExpansions(): Observable<SetsResponse> {
    return this.http.get<SetsResponse>(this.apiUrl);
  }

  getExpansionById(id: string): Observable<Set> {
    return this.getExpansions().pipe(
      map((response) => {
        const set = response.sets.find((item) => String(item.id) === id);

        if (!set) {
          throw new Error(`Expansion with id '${id}' not found`);
        }

        return set;
      }),
    );
  }

  getProductsByExpansionId(expansionId: string): Observable<ExpansionCatalog> {
    return this.http
      .get<ExpansionCatalog>(this.productApiUrl)
      .pipe(
        map(
          (sets) =>
            Object.values(sets).find((set) => set.expansion.code === expansionId) || null,
        ),
      );
  }

  getProductDetails(
    expansionId: string,
    productId: string,
  ): Observable<TcgSealedProduct | null> {
    return this.http.get<ExpansionCatalog[]>(this.productApiUrl).pipe(
      map((sets) => {
        const set = Object.values(sets).find((set) => set.expansion.code === expansionId);
        if (!set) {
          throw new Error(`Expansion with id '${expansionId}' not found`);
        }
        const product = set.sections
          .flatMap((section) => section.products)
          .find((product) => String(product.id) === productId);
        if (!product) {
          throw new Error(
            `Product with id '${productId}' not found in expansion '${expansionId}'`,
          );
        }
        return product;
      }),
    );
  }
}
