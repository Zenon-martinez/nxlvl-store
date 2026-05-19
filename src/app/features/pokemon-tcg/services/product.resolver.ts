import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PokemonTcgService } from './pokemon-tcg.service';
import { TcgSealedProduct } from '@models/product.interface';

@Injectable({ providedIn: 'root' })
export class ProductResolver implements Resolve<TcgSealedProduct | string | null> {
  constructor(private svc: PokemonTcgService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<TcgSealedProduct | string | null> {
    const productId = route.paramMap.get('productId');
    let expansionId = route.paramMap.get('expansionId');

    if (expansionId) {
      return this.svc.getExpansionNameById(expansionId);
    } else if (productId) {
      expansionId = route.parent!.paramMap.get('expansionId');
      return this.svc
        .getProductDetails(expansionId!, productId)
        .pipe(catchError(() => of(null)));
    }
    return of(null);
  }
}
