import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { IProduct, ProductCategory, OrderItem } from '../../../core/models';
import { ProductService, CartService } from '../../../core/services';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-product-long',
  templateUrl: './product-long.component.html',
  styleUrls: ['./product-long.component.css']
})
export class ProductLongComponent implements OnInit, OnDestroy {
  product: IProduct;

  private readonly _noDescription: string = 'Description missing';
  private _sub: Subscription;


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService) { }

  ngOnInit() {
    console.log('ProductLongComponent init');

    this._sub = this.route.paramMap
    .pipe(
      switchMap((params: Params) => {
        return this.productService.getById(+params.get('id'));
      }))
    .subscribe(
      product => this.product = {...product},
      err => console.log(err)
    );
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  addProductToCart(amount: string) {
    console.log('adding to cart.');
    const orderItem = new OrderItem(this.product, parseFloat(amount));
    this.cartService.add(orderItem);
  }

  hasEquivalents(): boolean {
    return typeof this.product.equivalents !== 'undefined' && this.product.equivalents.length > 0;
  }

  getDescription(): string {
    return this.product.description || this._noDescription;
  }

  getLongDescription(): string {
    return this.product.longDescription || this._noDescription;
  }

  getDisabledAttrValue() {
    return this.product.isAvailable ? null : true;
  }

  getProductCategoryEnumString(): string {
    return ProductCategory[this.product.category];
  }
}
