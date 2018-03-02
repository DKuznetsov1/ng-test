import { Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';

// NgRx
import { Store } from '@ngrx/store';
import { AppState, getSelectedProductByUrl } from '../../../+store';
import * as ProductsActions from '../../../+store/actions/products.actions';
import * as RouterActions from '../../../+store/actions/router.actions';

// rxjs
import { Subscription } from 'rxjs/Subscription';
import { of } from 'rxjs/observable/of';


import { Product, ProductCategory } from '../../../core/models';
import { ProductService } from '../../../core/services';
import { AutoUnsubscribe } from '../../../core';

@Component({
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
@AutoUnsubscribe()
export class ProductFormComponent implements OnInit {
  product: Product;

  private sub: Subscription;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.sub = this.store.select(getSelectedProductByUrl)
      .subscribe(product => this.product = product);
  }

  saveProduct() {
    const product = {...this.product};

    if (product.id) {
      this.store.dispatch(new ProductsActions.UpdateProduct(product));
    } else {
      this.store.dispatch(new ProductsActions.CreateProduct(product));
    }
  }

  deleteProduct() {
    this.store.dispatch(new ProductsActions.DeleteProduct(this.product));
  }

  goBack(): void {
    this.store.dispatch(new RouterActions.Back());
  }
}
