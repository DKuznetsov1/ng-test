import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState, getProductsLoaded, getProducts } from './../../+store';
import * as ProductsActions from './../../+store/actions/products.actions';
import * as RouterActions from '../../+store/actions/router.actions';

import { Observable } from 'rxjs/observable';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

import { Product } from './../models/product.model';

@Injectable()
export class ProductExistGuard implements CanActivate {

    constructor(
        private store: Store<AppState>
    ) {}

    canActivate(route: ActivatedRouteSnapshot) {
        return this.checkStore().pipe(
            switchMap(() => {
                const id = +route.paramMap.get('id');
                return this.hasProduct(id);
            })
        );
    }

    private hasProduct(id: number): Observable<boolean> {
        return this.store.select(getProducts)
        .pipe(
           map(products => {
            return !!products.find(product => product.id === id);
           }),
           tap(result => {
               if (!result) {
                   this.store.dispatch(new RouterActions.Go({path: ['/home']}));
               }
           }),
           take(1)
        );
    }

    private checkStore(): Observable<boolean> {
        return this.store.select(getProductsLoaded)
            .pipe(
                tap(loaded => {
                    if (!loaded) {
                        this.store.dispatch(new ProductsActions.GetProducts);
                    }
                }),
                take(1)
            );
    }
}
