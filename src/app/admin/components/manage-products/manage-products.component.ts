import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/models';
import { ProductService } from '../../../core/services';
import { Router } from '@angular/router';

// @NgRx
import { Store } from '@ngrx/store';
import * as RouterActions from '../../../+store/actions/router.actions';
import * as ProductsActions from './../../../+store/actions/products.actions';
import { AppState, getProducts, getProductsError } from './../../../+store';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  products$: Store<Product[]>;
  productsError$: Store<Error | string>;

  constructor(
    private store: Store<AppState>
  ) { }

  async ngOnInit() {
    this.products$ = this.store.select(getProducts);
    this.productsError$ = this.store.select(getProductsError);
  }

  addProduct() {
    this.store.dispatch(new RouterActions.Go({
      path: ['admin', 'products', 'add']
    }));
  }

}
