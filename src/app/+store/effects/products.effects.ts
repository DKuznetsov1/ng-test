import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

// @Ngrx
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { ProductsActionTypes } from './../actions';
import * as ProductsActions from './../actions/products.actions';
import * as RouterActions from './../actions/router.actions';

// Rxjs
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';

import { ProductService } from './../../core/services';

@Injectable()
export class ProductsEffects {

  @Effect() getProducts$: Observable<Action> = this.actions$
    .ofType<ProductsActions.GetProducts>(ProductsActionTypes.GET_PRODUCTS)
    .pipe(
      switchMap(action =>
        this.productService.getProducts()
          .then(products => new ProductsActions.GetProductsSuccess(products) )
          .catch(err => new ProductsActions.GetProductsError(err))
      )
    );

  @Effect() getProduct$: Observable<Action> = this.actions$
    .ofType<ProductsActions.GetProduct>(ProductsActionTypes.GET_PRODUCT)
    .pipe(
      map((action: ProductsActions.GetProduct) => action.payload),
      switchMap(payload =>
        this.productService.getById(payload)
        .then(product => new ProductsActions.GetProductSuccess(product))
          .catch(err => new ProductsActions.GetProductError(err))
      )
    );

  @Effect() updateProduct$: Observable<Action> = this.actions$
    .ofType<ProductsActions.UpdateProduct>(ProductsActionTypes.UPDATE_PRODUCT)
    .pipe(
      map((action: ProductsActions.UpdateProduct) => action.payload),
      switchMap(payload =>
        this.productService.update(payload)
          .pipe(
            map(product => {
              return new ProductsActions.UpdateProductSuccess(product);
            }),
            catchError(err => of(new ProductsActions.UpdateProductError(err)))
          )
      )
    );

  @Effect() createProduct$: Observable<Action> = this.actions$
    .ofType<ProductsActions.CreateProduct>(ProductsActionTypes.CREATE_PRODUCT)
    .pipe(
      map((action: ProductsActions.CreateProduct) => action.payload),
      switchMap(payload =>
        this.productService.create(payload)
        .pipe(
            map(product => {
              return new ProductsActions.CreateProductSuccess(product);
            }),
            catchError(err => of(new ProductsActions.CreateProductError(err)))
        )
      )
    );

  @Effect() deleteProduct$: Observable<Action> = this.actions$
    .ofType<ProductsActions.DeleteProduct>(ProductsActionTypes.DELETE_PRODUCT)
    .pipe(
      map((action: ProductsActions.DeleteProduct) => action.payload),
      switchMap(payload =>
        this.productService.delete(payload)
        .pipe(
            // Note: json-server doesn't return deleted product
            // so we use payload
            map(() => new ProductsActions.DeleteProductSuccess(payload)),
            catchError(err => of(new ProductsActions.DeleteProductError(err)))
        )
      )
    );

  @Effect() createUpdateDeleteProductSuccess$: Observable<Action> = this.actions$
    .ofType<ProductsActions.CreateProduct | ProductsActions.UpdateProduct>(
      ProductsActionTypes.CREATE_PRODUCT_SUCCESS,
      ProductsActionTypes.UPDATE_PRODUCT_SUCCESS,
      ProductsActionTypes.DELETE_PRODUCT_SUCCESS
    )
    .pipe(
      map(action => new RouterActions.Go({
        path: ['admin', 'products']
      }))
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService,
  ) {
    console.log('[PRODUCTS EFFECTS]');
  }

}
