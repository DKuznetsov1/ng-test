import { Action } from '@ngrx/store';

import { Product } from './../../core/models';

// [Products]- namespace
export class ProductsActionTypes {
  static readonly GET_PRODUCTS           = '[Products] GET_PRODUCTS';
  static readonly GET_PRODUCTS_SUCCESS   = '[Products] GET_PRODUCTS_SUCCESS';
  static readonly GET_PRODUCTS_ERROR     = '[Products] GET_PRODUCTS_ERROR';
  static readonly GET_PRODUCT            = '[Products] GET_PRODUCT';
  static readonly GET_PRODUCT_SUCCESS    = '[Products] GET_PRODUCT_SUCCESS';
  static readonly GET_PRODUCT_ERROR      = '[Products] GET_PRODUCT_ERROR';
  static readonly CREATE_PRODUCT         = '[Products] CREATE_PRODUCT';
  static readonly CREATE_PRODUCT_SUCCESS = '[Products] CREATE_PRODUCT_SUCCESS';
  static readonly CREATE_PRODUCT_ERROR   = '[Products] CREATE_PRODUCT_ERROR';
  static readonly UPDATE_PRODUCT         = '[Products] UPDATE_PRODUCT';
  static readonly UPDATE_PRODUCT_SUCCESS = '[Products] UPDATE_PRODUCT_SUCCESS';
  static readonly UPDATE_PRODUCT_ERROR   = '[Products] UPDATE_PRODUCT_ERROR';
  static readonly DELETE_PRODUCT         = '[Products] DELETE_PRODUCT';
  static readonly DELETE_PRODUCT_SUCCESS = '[Products] DELETE_PRODUCT_SUCCESS';
  static readonly DELETE_PRODUCT_ERROR   = '[Products] DELETE_PRODUCT_ERROR';

}

// Action Creators
export class GetProducts implements Action {
  readonly type = ProductsActionTypes.GET_PRODUCTS;
constructor(public payload?: Product) {}
}

export class GetProductsSuccess implements Action {
  readonly type = ProductsActionTypes.GET_PRODUCTS_SUCCESS;
  constructor(public payload: Product[]) {}
}

export class GetProductsError implements Action {
  readonly type = ProductsActionTypes.GET_PRODUCTS_ERROR;
  constructor(public payload: Error | string) {}
}

export class GetProduct implements Action {
  readonly type = ProductsActionTypes.GET_PRODUCT;
  constructor(public payload: number) {}
}

export class GetProductSuccess implements Action {
  readonly type = ProductsActionTypes.GET_PRODUCT_SUCCESS;
  constructor(public payload: Product) {}
}

export class GetProductError implements Action {
  readonly type = ProductsActionTypes.GET_PRODUCT_ERROR;
  constructor(public payload: Error | string) {}
}

export class CreateProduct implements Action {
  readonly type = ProductsActionTypes.CREATE_PRODUCT;
  constructor(public payload: Product) {}
}

export class CreateProductSuccess implements Action {
  readonly type = ProductsActionTypes.CREATE_PRODUCT_SUCCESS;
constructor(public payload: Product) { }
}

export class CreateProductError implements Action {
  readonly type = ProductsActionTypes.CREATE_PRODUCT_ERROR;
  constructor(public payload: Error | string) {}
}

export class UpdateProduct implements Action {
  readonly type = ProductsActionTypes.UPDATE_PRODUCT;
  constructor(public payload: Product) {}
}

export class UpdateProductSuccess implements Action {
  readonly type = ProductsActionTypes.UPDATE_PRODUCT_SUCCESS;
  constructor(public payload: Product) {}
}

export class UpdateProductError implements Action {
  readonly type = ProductsActionTypes.UPDATE_PRODUCT_ERROR;
  constructor(public payload: Error | string) {}
}

export class DeleteProduct implements Action {
  readonly type = ProductsActionTypes.DELETE_PRODUCT;
  constructor(public payload: Product) {}
}

export class DeleteProductSuccess implements Action {
  readonly type = ProductsActionTypes.DELETE_PRODUCT_SUCCESS;
  constructor(public payload: Product) {}
}

export class DeleteProductError implements Action {
  readonly type = ProductsActionTypes.DELETE_PRODUCT_ERROR;
  constructor(public payload: Error | string) {}
}

export type ProductsActions
= GetProducts
  | GetProductsSuccess
  | GetProductsError
  | GetProduct
  | GetProductSuccess
  | GetProductError
  | CreateProduct
  | CreateProductSuccess
  | CreateProductError
  | UpdateProduct
  | UpdateProductSuccess
  | UpdateProductError
  | DeleteProduct
  | DeleteProductSuccess
  | DeleteProductError;

