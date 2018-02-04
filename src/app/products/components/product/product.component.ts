import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IProduct, ProductCategory, OrderItem } from '../../../models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: IProduct;
  @Output() addToCartEvent: EventEmitter<OrderItem> = new EventEmitter<OrderItem>();

  private readonly noDescription: string = 'Description missing';

  constructor() { }

  ngOnInit() {
    console.log('ProductComponent init');
  }

  addToCart(amount: string) {
    this.addToCartEvent.emit(new OrderItem(this.product, parseFloat(amount)));
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
