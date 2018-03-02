import * as fromProducts from './../actions/products.actions';
import { ProductsActionTypes } from './../actions/products.actions';
import { initialProductsState, ProductsState } from './../state/products.state';

import { Product } from './../../core/models/product.model';

export function productsReducer(
  state = initialProductsState,
  action: fromProducts.ProductsActions
): ProductsState {
  console.log(`Product Reducer: Action came in! ${action.type}`);

  switch (action.type) {

    case ProductsActionTypes.GET_PRODUCTS:
    case ProductsActionTypes.GET_PRODUCT: {
      return {
        ...state,
        loading: true
      };
    }

    case ProductsActionTypes.GET_PRODUCTS_SUCCESS: {
      const data = <Product[]>action.payload;
      console.log(data);

      return {
        ...state,
        loading: false,
        loaded: true,
        data
      };
    }

    case ProductsActionTypes.GET_PRODUCT_SUCCESS: {

      return {
        ...state,
        loading: false,
        loaded: true,
      };
    }

    case ProductsActionTypes.GET_PRODUCTS_ERROR:
    case ProductsActionTypes.GET_PRODUCT_ERROR: {
      const error = action.payload;

      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    }

    case ProductsActionTypes.CREATE_PRODUCT:
    case ProductsActionTypes.UPDATE_PRODUCT:
    case ProductsActionTypes.DELETE_PRODUCT: {
      return {
        ...state
      };
    }

    case ProductsActionTypes.CREATE_PRODUCT_SUCCESS: {
      const product = { ...<Product>action.payload };
      const data = [...state.data];

      data.push(product);

      return {
        ...state,
        data
      };
    }

    case ProductsActionTypes.UPDATE_PRODUCT_SUCCESS: {
      const product = { ...<Product>action.payload };
      const data = [...state.data];
      const index = data.findIndex(p => p.id === product.id);

      data[index] = product;

      return {
        ...state,
        data
      };
    }

    case ProductsActionTypes.DELETE_PRODUCT_SUCCESS: {
      const product = { ...<Product>action.payload };
      const data = [...state.data];
      const index = data.findIndex(t => t.id === product.id);

      data.splice(index, 1);

      return {
        ...state,
        data
      };
    }

    case ProductsActionTypes.CREATE_PRODUCT_ERROR:
    case ProductsActionTypes.UPDATE_PRODUCT_ERROR:
    case ProductsActionTypes.DELETE_PRODUCT_ERROR: {
      const error = action.payload;
      return {
        ...state,
        error
      };
    }

    default: {
      console.log('UNKNOWN_PRODUCT ACTION');
      return state;
    }
  }
}
