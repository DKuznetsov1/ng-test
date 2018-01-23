import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IProduct } from '../../../models/iproduct.interface';
import { ProductCategory } from '../../../models/product-category.model';
import { OrderItem } from '../../../models/order-item.model';

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

  addToCart(product: IProduct, amount: string) {
    this.addToCartEvent.emit(new OrderItem(product, parseFloat(amount)));
  }

  hasEquivalents(product: IProduct): boolean {
    return typeof this.product.equivalents !== 'undefined' && this.product.equivalents.length > 0;
  }

  getDescription(): string {
    return this.product.description || this.noDescription;
  }

  getDisabledAttrForProduct(product: IProduct) {
    return product.isAvailable ? null : true;
  }

  getProductCategoryEnumString(category: ProductCategory) {
    return ProductCategory[category];
  }
}
