import { ProductsState } from './products.state';

import { ActionReducerMap } from '@ngrx/store';
import { productsReducer } from './../reducers';


export interface AppState {
  products: ProductsState;
}

export const reducers: ActionReducerMap<AppState> = {
  products: productsReducer
};
