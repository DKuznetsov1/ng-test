import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProductsState } from './../state';
import { Product, ProductCategory } from './../../core/models';
import { getRouterState } from './../../+store/selectors/router.selectors';

const getData = (state: ProductsState) => state.data;
const getLoaded = (state: ProductsState) => state.loaded;
const getLoading = (state: ProductsState) => state.loading;
const getError = (state: ProductsState) => state.error;

export const getProductsState = createFeatureSelector<ProductsState>('products');

export const getProducts = createSelector(getProductsState, getData);
export const getProductsLoaded = createSelector(getProductsState, getLoaded);
export const getProductsLoading = createSelector(getProductsState, getLoading);
export const getProductsError = createSelector(getProductsState, getError);

export const getSelectedProductByUrl = createSelector(
  getProducts,
  getRouterState,
  (products, router): Product => {
    const productID = router.state.params.id;
    if (productID) {
        return products.find(product => product.id === +productID);
    } else {
        return new Product(0, '', 0, ProductCategory.Drink, false, null, null, null, null);
    }
});
