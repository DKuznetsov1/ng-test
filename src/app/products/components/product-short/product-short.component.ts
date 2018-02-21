import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IProduct, ProductCategory, OrderItem } from '../../../core/models';

@Component({
  selector: 'app-product-short',
  templateUrl: './product-short.component.html',
  styleUrls: ['./product-short.component.css']
})
export class ProductShortComponent implements OnInit {
  @Input() product: IProduct;
  @Output() addToCart: EventEmitter<OrderItem> = new EventEmitter<OrderItem>();
  @Output() select: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  private readonly noDescription: string = 'Description missing';

  constructor() { }

  ngOnInit() {
    // console.log('ProductShortComponent init');
  }

  addProductToCart(amount: string) {
    this.addToCart.emit(new OrderItem(this.product, parseFloat(amount)));
  }

  selectItem() {
    this.select.emit(this.product);
  }

  hasEquivalents(): boolean {
    return typeof this.product.equivalents !== 'undefined' && this.product.equivalents.length > 0;
  }

  getDescription(): string {
    return this.product.description || this.noDescription;
  }

  getDisabledAttrValue() {
    return this.product.isAvailable ? null : true;
  }

  getProductCategoryEnumString(): string {
    return ProductCategory[this.product.category];
  }
}
