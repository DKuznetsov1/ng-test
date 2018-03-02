import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

// @Ngrx
import { Store } from '@ngrx/store';
import * as ProductsActions from './../../../+store/actions/products.actions';
import { AppState, getProducts, getProductsError } from './../../../+store';
import * as RouterActions from '../../../+store/actions/router.actions';

import { OrderItem, Product } from '../../../core/models';
import { ProductService, CartService } from '../../../core/services';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products$: Store<Product[]>;
  productsError$: Store<Error | string>;

  constructor(
    public cartService: CartService,
    private store: Store<AppState>) { }

  async ngOnInit() {
    this.products$ = this.store.select(getProducts);
    this.productsError$ = this.store.select(getProductsError);
  }

  onAddToCart(orderItem: OrderItem) {
    this.cartService.add(orderItem);
  }

  onSelect(product: Product) {
    this.store.dispatch(new RouterActions.Go({
      path: ['home', { outlets: { details: ['product', product.id ] } }]
    }));
  }

}
